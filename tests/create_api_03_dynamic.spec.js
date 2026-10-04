const {test,expect}=require('@playwright/test')
import { faker } from '@faker-js/faker'
const {DateTime} =require('luxon');


test('create a post api using dunamic api response', async({request})=>{

  const firstname= faker.person.firstName();
  const lastname= faker.person.lastName();

  const totalprice=faker.number.int(1000);

  const checkin= DateTime.now().toFormat('yyyy-mm-dd');
  const checkout= DateTime.now().plus({day:10}).toFormat('yyyy-mm-dd');

  const apiResponse=await request.post(`/booking`,{
    data: {
      firstname: firstname,
      lastname: lastname,
      totalprice: totalprice,
      depositpaid: true,
      bookingdates: {
        checkin:checkin,
        checkout: checkout,
      },
      additionalneeds: "super bowls",
    },

  })

  expect(apiResponse.ok()).toBeTruthy();
  expect(apiResponse.status()).toBe(200);

  const apiResponseBody= await apiResponse.json();

  console.log(apiResponseBody);


  expect(apiResponseBody.booking).toHaveProperty("firstname",firstname)
  expect(apiResponseBody.booking).toHaveProperty("lastname",lastname)

  expect(apiResponseBody.booking.bookingdates).toHaveProperty("checkin",checkin);
  expect(apiResponseBody.booking.bookingdates).toHaveProperty("checkout",checkout);


})