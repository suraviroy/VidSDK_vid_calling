
import io from "socket.io-client";

const BASE_URL = 'https://api.videosdk.live';
export const socket = io(BASE_URL);
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhOTBlZDM0MC1lNzI5LTQ5OGQtYTQxMi1lNzZiZWEyNzgyNmQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMzM1MTM5NywiZXhwIjoxNzM0ODg3Mzk3fQ.7SxGO98xXOxxq8w1_JUwFIlU9I0GRAAKnUj0AD-jHa0";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  console.log("Socket URL:", `${BASE_URL}/socket.io/?EIO=4&transport=polling&t=OoVVedi`);

  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};