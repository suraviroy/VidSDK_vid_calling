//import {initializeApp, applicationDefault } from 'firebase-admin/app';
//import { getMessaging } from "firebase-admin/messaging";
//import express, { json } from "express";
//import cors from "cors";

//GOOGLE_APPLICATION_CREDENTIALS="./push-notification-ngd-firebase-adminsdk-rb38t-1bdc9e0ccf.json";
require("dotenv").config();
//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\hackathon\Internship\vidcall\videosdk-rtc-nodejs-sdk-example\push-notification-ngd-firebase-adminsdk-rb38t-1bdc9e0ccf.json"
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { default: fetch } = require("node-fetch");
const jwt = require("jsonwebtoken");

// const admin =require("firebase-admin")
// const serviceAccount=require("./push-notification-ngd-firebase-adminsdk-rb38t-1bdc9e0ccf.json")


const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//
app.get("/", (req, res) => {
  res.send("Hello World!");
});


//
app.get("/get-token", (req, res) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "10m", algorithm: "HS256" };

  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  console.log("Generated token:", token);
  res.json({ token });
});

//
app.post("/create-meeting/", (req, res) => {
  const { token, region } = req.body;
  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ region }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});

//
app.post("/validate-meeting/:meetingId", (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});





// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   projectId: 'push-notification-ngd',
// });

// app.post("/send", function (req, res) {
//   const receivedToken = req.body.fcmToken;
  
//   const message = {
//     notification: {
//       title: "Notif",
//       body: 'This is a Test Notification'
//     },
//     token: "fRB8Wi0AsfwhMoHuzPcUQg:APA91bFvBnRNAq-fqjlcvo-vRfec3tobaufcegBMhO-EkLEs2feSFDt4v033RqE97feq06RwxZWk0ct-5fk2kBK88DA3JkblbpRZRLgyeuucbHs9U0ms5VAqaieMlP6Dvqg6Q9SDxP35",
//   };
  
//   admin.getMessaging()
//     .send(message)
//     .then((response) => {
//       res.status(200).json({
//         message: "Successfully sent message",
//         token: receivedToken,
//       });
//       console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//       res.status(400);
//       res.send(error);
//       console.log("Error sending message:", error);
//     });
  
  
// });
//const token= "fRB8Wi0AsfwhMoHuzPcUQg:APA91bFvBnRNAq-fqjlcvo-vRfec3tobaufcegBMhO-EkLEs2feSFDt4v033RqE97feq06RwxZWk0ct-5fk2kBK88DA3JkblbpRZRLgyeuucbHs9U0ms5VAqaieMlP6Dvqg6Q9SDxP35";

app.get("/send", (req, res) => {
  res.send("Hello World!");
  // const { token, message } = req.body;

  // if (!token || !message) {
  //   return res.status(400).json({ error: 'Token and message are required' });
  // }

  // const payload = {
  //   data: {
  //     message: message,
  //   },
  // };

  // const options = {
  //   priority: 'high',
  //   timeToLive: 60 * 60 * 24,
  // };

  // admin.messaging().sendToDevice(token, payload, options)
  //   .then((response) => {
  //     console.log('Successful ', response);
  //     res.status(200).json({ success: true, message: 'Notification sent successfully' });
  //   })
  //   .catch((error) => {
  //     console.error('Error ', error);
  //     res.status(500).json({ error: 'Error sending notification' });
  //   });
});







app.listen(PORT, () => {
  console.log(`API server listening at http://localhost:${PORT}`);
});
