const API_BASE_URL = "https://api.videosdk.live";
export const VIDEOSDK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjMTg5ZDc5ZC1hYTJkLTQzODItODMwYy03OGQ2ZTBlZWRiYWMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMzc0NzI2MSwiZXhwIjoxNzM1MjgzMjYxfQ.y94LcNlFBpU8BC7b8GzMmQ6R9qxfQNQAFqrt7LKIuu8";
const API_AUTH_URL = "http://localhost:8080";

export const getToken = async () => {
  // if (VIDEOSDK_TOKEN && API_AUTH_URL ) {
  //   console.log("token",VIDEOSDK_TOKEN, API_AUTH_URL)
  //   console.error(
  //     "Error: Provide only ONE PARAMETER - either Token or Auth API"
  //   );
  // } else 
  if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();

    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return roomId;
};

// export const createMeeting = async ({ token }) => {
//   // console.log("Socket URL:", `${BASE_URL}/socket.io/?EIO=4&transport=polling&t=OoVVedi`);

//   const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
//     method: "POST",
//     headers: {
//       authorization: `${VIDEOSDK_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({}),
//   });
//   //Destructuring the roomId from the response
//   const { roomId } = await res.json();
//   return roomId;
// };

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result ? result.roomId === roomId : false;
};
