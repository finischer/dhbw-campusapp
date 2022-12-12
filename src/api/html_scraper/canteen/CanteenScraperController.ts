export class CanteenScraper {
  getCanteens() {
    // returns all names of all canteens in Mannheim
  }

  getInfoOfCanteen(canteen: string) {
    // returns information of the given canteen
    // available Information: name, opening hours, adress (name, street, houseNumber, other, zip code, city, additional info), description
  }

  getMenuOfCanteen(canteen: string, rangeStart: Date, rangeEnd: Date) {
    // returns the offer for a specific canteen in a given range. All offers beetween the given range will returned
    // param canteen: name of canteen
    // param rangeStart: start date of offer range
    // param rangeEnd: end date of offer rang
  }
}
