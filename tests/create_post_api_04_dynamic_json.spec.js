const { test, expect } = require("@playwright/test");
const bookingdata=require("../testdata/post_request_dynamic_jsonfile.json")
import { stringFormat } from "../utils/common";

test("create post request using static json", async ({ request }) => {
    //create post request

   const dynamicApiBodyresponse= stringFormat(JSON.stringify(bookingdata),"raja","Kiran","banana");
 const apiresponse= await request.post(`/booking`, {
    data:JSON.parse(dynamicApiBodyresponse)
  })
  const apilogresponse=await apiresponse.json();
  console.log(apilogresponse);

  //validate api code
    expect(apiresponse.ok()).toBeTruthy();
    expect(apiresponse.status()).toBe(200);

    expect(apilogresponse.booking).toHaveProperty("firstname", "raja")
    expect(apilogresponse.booking).toHaveProperty("lastname", "Kiran")

        expect(apilogresponse.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
         expect(apilogresponse.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")
    
});
