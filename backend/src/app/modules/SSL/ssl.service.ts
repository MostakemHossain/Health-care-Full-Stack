import axios from "axios";
import httpStatus from "http-status";
import config from "../../../config";
import AppError from "../../errors/AppError";

const initPayment = async (paymentInfo: any) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_password,
      total_amount: paymentInfo?.amount,
      currency: "BDT",
      tran_id: paymentInfo?.transactionId,
      success_url: config.ssl.success_url,
      fail_url: config.ssl.fail_url,
      cancel_url: config.ssl.cancel_url,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Doctor Appointment",
      product_category: "Service",
      product_profile: "general",
      cus_name: paymentInfo?.name,
      cus_email: paymentInfo?.email,
      cus_add1: paymentInfo?.address,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: paymentInfo.contactNumber,
      cus_fax: "01711111111",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: 1000,
      ship_country: "N/A",
    };
    const response = await axios({
      method: "post",
      url: config.ssl.ssl_payment_api,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment gateway is down");
  }
};

export const SSLService = {
  initPayment,
};
