const { test, expect } = require("@playwright/test");
const bookingdata=require("../testdata/post_request.json")

test("create post request using static json", async ({ request }) => {
    //create post request
 const apiresponse= await request.post(`/booking`, {
    data:bookingdata
  })
  const apilogresponse=await apiresponse.json();
  console.log(apilogresponse);

  //validate api code
    expect(apiresponse.ok()).toBeTruthy();
    expect(apiresponse.status()).toBeTruthy();

    expect(apilogresponse.booking).toHaveProperty("firstname", "Raja")
    expect(apilogresponse.booking).toHaveProperty("lastname", "Kiran")

        expect(apilogresponse.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
         expect(apilogresponse.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")
    
});
