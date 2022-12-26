import cheerio from "cheerio-without-node-native";
import axios from "axios";
import ICAL from "ical.js";
import moment from "moment";
import { ICourse, LectureType, OrganizedLectures } from "./lectures.types";
import { IResponseTypes } from "../types/IResponseTypes";

export class LecturesController {
  baseUrl: string;
  icalUrl: string | undefined;

  constructor(
    icalUrl: string | undefined = undefined,
    courseId: string | undefined = undefined
  ) {
    this.baseUrl = "http://vorlesungsplan.dhbw-mannheim.de/ical.php";
    if (courseId !== undefined) {
      this.icalUrl = this.generateCourseUrl(courseId);
    } else if (icalUrl !== undefined) {
      // own ical url --> for import calendar feature (some courses are using a google calendar for their lectures)
      this.icalUrl = icalUrl;
    }
  }

  generateCourseUrl(courseId: string) {
    return this.baseUrl + `?uid=${courseId}`;
  }

  changeCalendarByCourseId(courseId: string) {
    this.icalUrl = this.generateCourseUrl(courseId);
  }

  changeCalendarByIcalUrl(icalUrl: string) {
    this.icalUrl = icalUrl;
  }

  async getCourses(): Promise<IResponseTypes> {
    const res = await axios.get(this.baseUrl);

    if (res.status === 503) {
      return {
        status: res.status,
        msg: "service unavailable",
        data: undefined,
      };
    } else if (res.status !== 200) {
      return {
        status: res.status,
        msg: "not ok",
        data: undefined,
      };
    }

    const $ = cheerio.load(res.data);

    const $courseOptions = $("#class_select").find("option");

    const courseList: ICourse[] = [];

    $courseOptions.each((index: number, element: any) => {
      // jump over the first element (it is not a course)
      if (index > 0) {
        const courseName = $(element).attr("label").trim();
        const courseId = $(element).attr("value").trim();

        const newCourse: ICourse = {
          courseId,
          courseName,
        };

        courseList.push(newCourse);
      }
    });

    return {
      status: res.status,
      msg: "ok",
      data: courseList,
    };
  }

  async getLecturesFromiCalData(icalDataString: string) {
    let icalData = ICAL.parse(icalDataString);
    let icalComponent = new ICAL.Component(icalData);

    // set timezone
    let timezoneComponent = icalComponent.getFirstSubcomponent("vtimezone");
    if (!timezoneComponent) {
      return {};
    }

    let timezoneId = timezoneComponent.getFirstProperty("tzid");
    let timezone = new ICAL.Timezone({
      component: timezoneComponent,
      tzid: timezoneId,
    });

    // register timezone
    ICAL.TimezoneService.register(timezoneId, timezone);

    // get events
    let vEvents = icalComponent.getAllSubcomponents("vevent");

    let lectures: LectureType[] = vEvents.map((vEvent: any) => {
      let event = new ICAL.Event(vEvent);

      const location = event.location.replace("Raum", "").trim();

      const newEvent: LectureType = {
        uid: event.uid,
        lecture: event.summary,
        startDate: event.startDate.toJSDate(),
        startTime: event.startDate.toJSDate().getTime(),
        endDate: event.endDate.toJSDate(),
        endTime: event.endDate.toJSDate().getTime(),
        location,
      };

      return newEvent;
    });

    let range = 180; // 6 months
    let rangeStart = moment();
    let rangeEnd = moment().add(range, "days").toDate();

    let filteredLectures = lectures.filter((lecture: LectureType) => {
      return (
        lecture.startTime >= rangeStart.unix() * 1000 &&
        lecture.endDate <= rangeEnd
      );
    });

    // sort by date
    filteredLectures.sort((lecture1: any, lecture2: any) => {
      if (lecture1.startDate < lecture2.startDate) {
        return -1;
      }

      if (lecture1.startDate > lecture2.startDate) {
        return 1;
      }

      return 0;
    });

    // lectures with formatted time
    const sortedByDateLectures: LectureType[] = filteredLectures.map(
      (event: any) => {
        const startDate = moment(event.startDate).format("DD.MM.YYYY");
        const endDate = moment(event.endDate).format("DD.MM.YYYY");
        const startTime = moment(event.startTime).format("HH:mm");
        const endTime = moment(event.endTime).format("HH:mm");

        return {
          uid: event.uid,
          lecture: event.lecture,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          location: event.location,
        };
      }
    );

    // prepare data for VisualizedList
    let organizedLectures: OrganizedLectures[] = [];
    for (var i = 0; i < sortedByDateLectures.length; i++) {
      const { startDate } = sortedByDateLectures[i];

      const tmp_arr = organizedLectures.filter(
        (item) => item.title === startDate
      );

      if (tmp_arr.length !== 0) {
        continue;
      }

      const result = sortedByDateLectures.filter((lecture: LectureType) => {
        return startDate == lecture.startDate;
      });

      organizedLectures.push({
        title: startDate.toString(),
        data: result,
      });
    }

    return organizedLectures;
  }

  async getSchedule(): Promise<IResponseTypes> {
    let lectures = undefined;

    if (this.icalUrl === undefined)
      return {
        status: 400,
        msg: "ical url is undefined",
        data: undefined,
      };

    try {
      const response = await axios.get(this.icalUrl, {
        headers: {
          "Cache-control": "no-cache",
        },
      });

      if (response.status === 503) {
        // server error
        return {
          status: response.status,
          msg: "service unavailable",
          data: undefined,
        };
      } else if (response.status !== 200) {
        // other error
        return {
          status: response.status,
          msg: "not ok",
          data: undefined,
        };
      } else {
        // success
        const responseBody: string = await response.data;
        lectures = await this.getLecturesFromiCalData(responseBody).then(
          (res) => res
        );
      }
    } catch (err) {
      return {
        status: 400,
        msg: "wrong url",
        data: undefined,
      };
    }

    return {
      status: 200,
      msg: "ok",
      data: lectures,
      requestTime: moment(),
    };
  }
}

// import { API_URL } from "@env";
// import axios from "axios";
// import { format, startOfToday } from "date-fns";
// import ICAL from "ical.js";
// import { resolve } from "../helpers";
// import { instance } from "./axios.config";

// async function getLecturesFromiCalData(iCalendarData) {
//   var jcalData = ICAL.parse(iCalendarData);
//   var comp = new ICAL.Component(jcalData);

//   // Timezone
//   var timezoneComp = comp.getFirstSubcomponent("vtimezone");
//   if (!timezoneComp) {
//     return {};
//   }

//   var tzid = timezoneComp.getFirstProperty("tzid");
//   var timezone = new ICAL.Timezone({
//     component: timezoneComp,
//     tzid,
//   });

//   ICAL.TimezoneService.register(tzid, timezone);

//   // Events
//   let vevents = comp.getAllSubcomponents("vevent");

//   let lectures = vevents.map((vevent) => {
//     let event = new ICAL.Event(vevent);

//     const location = event.location.replace("Raum", "").trim();

//     const new_event = {
//       uid: event.uid,
//       lecture: event.summary,
//       startDate: event.startDate.toJSDate(),
//       startTime: event.startDate.toJSDate().getTime(),
//       endDate: event.endDate.toJSDate(),
//       endTime: event.endDate.toJSDate().getTime(),
//       location,
//     };

//     return new_event;
//   });

//   var range = 180;
//   var rangeStart = startOfToday();
//   var rangeEnd = new Date().setDate(rangeStart.getDate() + range);

//   var filteredLectures = lectures.filter((filterLecture) => {
//     return (
//       filterLecture.startTime >= rangeStart.getTime() &&
//       filterLecture.endDate <= rangeEnd
//     );
//   });

//   filteredLectures.sort((lecture1, lecture2) => {
//     if (lecture1.startDate < lecture2.startDate) {
//       return -1;
//     }

//     if (lecture1.startDate > lecture2.startDate) {
//       return 1;
//     }

//     return 0;
//   });

//   const sortedByDateLectures = filteredLectures.map((event) => {
//     const startTime = format(event.startTime, "HH:mm");
//     const endTime = format(event.endTime, "HH:mm");

//     return {
//       uid: event.uid,
//       lecture: event.lecture,
//       startDate: event.startDate,
//       startTime: startTime,
//       endTime: endTime,
//       location: event.location,
//     };
//   });

//   var organized_lectures = [];

//   for (var i = 0; i < sortedByDateLectures.length; i++) {
//     const firstEvent = sortedByDateLectures[i];
//     const startDate = format(firstEvent.startDate, "dd.MM.yyyy");

//     const tmp_arr = organized_lectures.filter(
//       (item) => item.title === startDate
//     );

//     if (tmp_arr.length !== 0) {
//       continue;
//     }

//     const firstEventDate = new Date(firstEvent.startDate).setHours(0, 0, 0, 0);

//     const result = sortedByDateLectures.filter((event) => {
//       const date = new Date(event.startDate).setHours(0, 0, 0, 0);

//       return firstEventDate === date;
//     });

//     organized_lectures.push({
//       title: startDate,
//       data: result,
//     });
//   }

//   return organized_lectures;
// }

// export async function getItems(url) {
//   let lectures = null;
//   let status = null;

//   try {
//     const response = await fetch(url, { cache: "no-store" });

//     if (response.status === 503) {
//       status = {
//         code: response.status,
//         msg: "serviceUnavailable",
//       };
//     } else if (response.status !== 200) {
//       status = {
//         code: response.status,
//         msg: "not ok",
//       };
//     } else {
//       const responseBody = await response.text();
//       status = {
//         code: response.status,
//         msg: "ok",
//       };
//       lectures = await getLecturesFromiCalData(responseBody).then((res) => res);
//     }
//   } catch (err) {
//     return {
//       lectures: null,
//       status: {
//         code: 400,
//         msg: "wrongUrl",
//       },
//     };
//   }

//   return { lectures, status };
// }

// export async function getCourses() {
//   return await resolve(
//     instance.get("/api/v1.0/courses").then((res) => res.data)
//   );
// }
