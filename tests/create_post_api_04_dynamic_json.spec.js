const { test, expect } = require("@playwright/test");
const bookingdata=require("../testdata/post_request_dynamic_jsonfile.json")
import { stringFormat } from "../utils/common";

import {faker} from "@faker-js/faker";
const {DateTime}=require("luxon")

test("create post request using static json", async ({ request }) => {


    //create post request

    const firstname= faker.person.firstName();
    const lastName= faker.person.lastName();

    const additionalneeds= faker.word.words();

   const dynamicApiBodyresponse= stringFormat(JSON.stringify(bookingdata),firstname,lastName,additionalneeds);
 const apiresponse= await request.post(`/booking`, {
    data:JSON.parse(dynamicApiBodyresponse)
  })
  const apilogresponse=await apiresponse.json();
  console.log(apilogresponse);

  //validate api code
    expect(apiresponse.ok()).toBeTruthy();
    expect(apiresponse.status()).toBe(200);

    expect(apilogresponse.booking).toHaveProperty("firstname", firstname)
    expect(apilogresponse.booking).toHaveProperty("lastname", lastName)
    expect(apilogresponse.booking).toHaveProperty("additionalneeds",additionalneeds)

        expect(apilogresponse.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
         expect(apilogresponse.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")
    
});
