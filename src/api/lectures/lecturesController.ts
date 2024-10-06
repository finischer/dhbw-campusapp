import cheerio from "cheerio-without-node-native";
import axios from "axios";
import ICAL from "ical.js";
import moment from "moment";
import { ICourse, LectureType, OrganizedLectures } from "./lectures.types";
import { IResponseTypes } from "../types/IResponseTypes";
import { isValidUrl } from "../../utilities/validationHelpers";

export class LecturesController {
  baseUrl: string;
  icalUrl: string | undefined;

  constructor(icalUrl: string | undefined = undefined, courseId: string | undefined = undefined) {
    this.baseUrl = "https://vorlesungsplan.dhbw-mannheim.de/ical.php";
    if (icalUrl !== undefined) {
      // own ical url --> for import calendar feature (some courses are using a google calendar for their lectures)
      this.icalUrl = icalUrl;
    } else if (courseId !== undefined) {
      this.icalUrl = this.generateCourseUrl(courseId);
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

  async getCourseById(courseId: string): Promise<IResponseTypes> {
    const res = await this.getCourses();

    if (res.status !== 200)
      return {
        status: res.status,
        msg: "not ok",
        data: undefined,
      };

    const allCourses: ICourse[] = res.data as ICourse[];

    const course = allCourses.find((course) => course.courseId === courseId);

    return {
      status: res.status,
      msg: "not ok",
      data: course,
    };
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
    if (timezoneComponent) {
      // throw new Error("No timezone component was found");
      let timezoneId = timezoneComponent.getFirstProperty("tzid");
      let timezone = new ICAL.Timezone({
        component: timezoneComponent,
        tzid: timezoneId,
      });

      // register timezone
      ICAL.TimezoneService.register(timezoneId, timezone);
    }

    // get events
    let vEvents = icalComponent.getAllSubcomponents("vevent");

    let lectures: LectureType[] = vEvents.map((vEvent: any) => {
      let event = new ICAL.Event(vEvent);

      const location = event.location?.replace("Raum", "").trim();

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

    let rangeInDays = 180; // 6 months
    let rangeStart = moment();
    let rangeEnd = moment().add(rangeInDays, "days").toDate();

    let filteredLectures = lectures.filter((lecture: LectureType) => {
      let startTime = lecture.startTime;

      if (typeof startTime === "string") {
        startTime = parseInt(startTime);
      }

      return startTime >= rangeStart.unix() * 1000 && lecture.endDate <= rangeEnd;
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
    const sortedByDateLectures: LectureType[] = filteredLectures.map((event: any) => {
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
    });

    // prepare data for VisualizedList
    let organizedLectures: OrganizedLectures[] = [];
    for (var i = 0; i < sortedByDateLectures.length; i++) {
      const { startDate } = sortedByDateLectures[i];

      const tmp_arr = organizedLectures.filter((item) => item.title === startDate);

      if (tmp_arr.length !== 0) {
        continue;
      }

      const result = sortedByDateLectures.filter((lecture: LectureType) => {
        return startDate.toString() === lecture.startDate.toString();
      });

      organizedLectures.push({
        title: startDate.toString(),
        data: result,
      });
    }

    return organizedLectures;
  }

  async getScheduleFromWeb(): Promise<IResponseTypes> {
    let lectures = undefined;

    if (this.icalUrl === undefined) {
      return {
        status: 400,
        msg: "ical url is undefined",
        data: undefined,
      };
    }

    // check if ical url is a valid url
    if (!isValidUrl(this.icalUrl)) {
      throw new Error("No valid URL");
    }

    try {
      const response = await axios.get(this.icalUrl, {
        headers: {
          "Cache-control": "no-cache",
        },
        timeout: 10000,
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
        lectures = await this.getLecturesFromiCalData(responseBody).then((res) => res);
      }
    } catch (err) {
      let message = "wrong url";
      if (err instanceof Error) message = err.message;
      else message = String(err);

      return {
        status: 400,
        msg: message,
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
