import React, { useState } from "react";
import { useMeetingAppContext } from "../MeetingAppContextDef";
import { ParticipantView } from "./ParticipantView";
import { MdOutlineZoomInMap } from "react-icons/md";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { BsLayoutSplit } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";
import addNotification from 'react-push-notification';
import tone from '../sound/ring.mp3';
import { getMeetingCode } from "./MeetingDetailsScreen";
import { ToastContainer, toast } from 'react-toastify';


const MemoizedParticipant = React.memo(
  ParticipantView,
  (prevProps, nextProps) => {
    return (
      prevProps.participantId === nextProps.participantId &&
      prevProps.meetingId === nextProps.meetingId
    );

  }
);





let storedCode;
export const sendMeetingCode = (code) => {

  console.log('Meeting code sent:', code);
  storedCode = code;
};




function ParticipantGrid({ participantIds, isPresenting }) {
  const { sideBarMode } = useMeetingAppContext();
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;



  function notifycaller(meetingId) {
    const audio = new Audio(tone);
    localStorage.setItem("mi",meetingId);
   
    //audio.play().catch(error => console.error('Audio playback error:', error));
    // addNotification({
    //   title: "Recive the Call",
    //   body: "Hello",
    //   //sound: audio.play(),
    //   native: true,
    //   onClick: () => {
    //     audio.pause();
    //     audio.currentTime = 0;
    //     // localStorage.setItem("mi",meetingId);
    //     getMeetingCode(storedCode);
    //     window.open('http://localhost:3000/react-rtc-demo', '_blank')
        
    //   },
    //   //sound: audio.play(),
    //   duration: 10000, 
    //   theme: 'darkblue',
    //   audio: true,
    //   onclose:() => {audio.pause();
    //     audio.currentTime = 0;},
    // });

    //   audio.play()
    //   notification.onclick = function () {
    //     audio.pause();
    //     notification.close(); 
    // };
    //   notification.onclose = function () {
    //     audio.pause();
    // };
    
    //console.log("Notification send: ", meetingId);
    toast("Call send!")
    const notificationData = {
      profile_id: "91",
      title: "Notification Title",
      message: {meetingId},
      data: {
        key1: "value1",
        key2: "value2"
      }
    };
    const endpointUrl = 'http://139.59.60.236:8080/master/send_notification/';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    };
    fetch(endpointUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Notification sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending notification:', error);
      });
  }

  const perRow =
    isMobile || isPresenting
      ? participantIds.length < 4
        ? 1
        : participantIds.length < 9
          ? 2
          : 3
      : participantIds.length < 5
        ? 2
        : participantIds.length < 7
          ? 3
          : participantIds.length < 9
            ? 4
            : participantIds.length < 10
              ? 3
              : participantIds.length < 11
                ? 4
                : 4;


  // <div
  //   className={`flex flex-col md:flex-row flex-grow m-3 items-center justify-center ${
  //     participantIds.length < 2 && !sideBarMode && !isPresenting
  //       ? "md:px-16 md:py-2"
  //       : participantIds.length < 3 && !sideBarMode && !isPresenting
  //       ? "md:px-16 md:py-8"
  //       : participantIds.length < 4 && !sideBarMode && !isPresenting
  //       ? "md:px-16 md:py-4"
  //       : participantIds.length > 4 && !sideBarMode && !isPresenting
  //       ? "md:px-14"
  //       : "md:px-0"
  //   }`}
  // >
  //   <div className="flex flex-col w-full h-full">
  //     {Array.from(
  //       { length: Math.ceil(participantIds.length / perRow) },
  //       (_, i) => {
  //         return (
  //           <div
  //             key={`participant-${i}`}
  //             className={`flex flex-1 ${
  //               isPresenting
  //                 ? participantIds.length === 1
  //                   ? "justify-start items-start"
  //                   : "items-center justify-center"
  //                 : "items-center justify-center"
  //             }`}
  //           >
  //             {participantIds
  //               .slice(i * perRow, (i + 1) * perRow)
  //               .map((participantId) => {
  //                 return (
  //                   <div
  //                     key={`participant_${participantId}`}
  //                     className={`flex flex-1 ${
  //                       isPresenting
  //                         ? participantIds.length === 1
  //                           ? "md:h-48 md:w-44 xl:w-52 xl:h-48 "
  //                           : participantIds.length === 2
  //                           ? "md:w-44 xl:w-56"
  //                           : "md:w-44 xl:w-48"
  //                         : "w-full"
  //                     } items-center justify-center h-full ${
  //                       participantIds.length === 1
  //                         ? "md:max-w-7xl 2xl:max-w-[1480px] "
  //                         : "md:max-w-lg 2xl:max-w-2xl"
  //                     } overflow-clip overflow-hidden  p-1`}
  //                   >
  //                     <MemoizedParticipant participantId={participantId} />
  //                   </div>
  //                 );
  //               })}
  //           </div>
  //         );
  //       }
  //     )}
  //   </div>
  // </div>


  //****************************************************************************** */
  // return (
  // <div
  //   className={`relative flex flex-col md:flex-row flex-grow m-3 items-center justify-center ${
  //     participantIds.length === 1 ? "md:px-6 md:py-3" : "md:px-16 md:py-4"
  //   }`}
  // >
  //   <div className="relative flex flex-col w-full h-full">
  //     {Array.from(
  //       { length: participantIds.length },
  //       (_, i) => {
  //         return (
  //           <div
  //             key={`participant_${participantIds[i]}`}
  //             className={`flex ${
  //               participantIds.length === 1 ? "absolute inset-0" : i === 1 ? "absolute inset-3" : " absolute bottom-0 right-0"
  //             } ${
  //               participantIds.length === 1
  //                 ? "h-full w-full border border-white rounded-md z-10"
  //                 : i === 1
  //                   ? "md:h-full md:w-full xl:w-full xl:h-full border border-white rounded-md z-10"
  //                   : "md:h-32 md:w-32 xl:w-40 xl:h-40 border border-white rounded-md z-20"
  //             } overflow-clip overflow-hidden p-1`}
  //           >
  //             <MemoizedParticipant participantId={participantIds[i]} />
  //           </div>
  //         );
  //       } 
  //     )}
  //   </div>
  // </div>


  //   );
  // }


  //************************************************************************* */



  const [largerView, setLargerView] = useState(true);
  const [equalLayout, setEqualLayout] = useState(false);

  const toggleView = () => {
    setLargerView((prevLargerView) => !prevLargerView);
    setEqualLayout(false);
  };
  const setEqualScreenSize = () => {
    setEqualLayout(true);
  };

  const LayoutOptionsDropdown = ({ onChangeLayout }) => {
    return (
      <div className="relative">
        <div
          className="fixed top-8 right-7 cursor-pointer text-white z-50"
          title="Change Layout"
          onClick={() => {
            // Call the parent component's function to change the layout
            onChangeLayout();
            // Update the layout based on the current state

          }}
        >
          <BsLayoutSplit size={25} />
        </div>
      </div>
    );
  };

  

  //   return (
  //     <div
  //       className={`relative flex flex-col md:flex-row flex-grow m-3 items-center justify-center ${
  //         participantIds.length === 1 ? "md:px-6 md:py-1" : "md:px-16 md:py-4"
  //       } ${
  //         equalLayout
  //           ? "grid grid-cols-2 gap-4"
  //           : ""
  //       }`}
  //     >
  //       <div className="relative flex flex-col w-full h-full">
  //         {participantIds.map((participantId, i) => (
  //           <div
  //             key={`participant_${participantId}`}
  //             className={`flex ${
  //               participantIds.length === 1
  //                 ? "absolute inset-0"
  //                 : i === 1
  //                 ? largerView
  //                   ? "absolute inset-3"
  //                   : " absolute bottom-0 right-0"
  //                 : i === 0
  //                 ? largerView
  //                   ? " absolute bottom-0 right-0" 
  //                   : "absolute inset-3"
  //                 : " absolute bottom-0 right-0"
  //             } ${
  //               participantIds.length === 1
  //                 ? "h-full w-full border border-white rounded-md z-10"
  //                 : i === 0
  //                 ? equalLayout
  //               ? "col-span-1 z-50 border border-white rounded-md "
  //               // : equalLayout
  //               // ? "col-span-1 z-50 border border-white rounded-md " 
  //               : largerView
  //                   ? "md:h-32 md:w-32 xl:w-40 xl:h-40 border border-white rounded-md z-20"
  //                   : "md:h-full md:w-full xl:w-full xl:h-full border border-white rounded-md z-10"

  //                   : largerView
  //                 ? "md:h-full md:w-full xl:w-full xl:h-full border border-white rounded-md z-10"
  //                 : "md:h-32 md:w-32 xl:w-40 xl:h-40 border border-white rounded-md z-20"
  //             } overflow-clip overflow-hidden p-1`}
  //           >
  //             <MemoizedParticipant participantId={participantId} />
  //           </div>
  //         ))}
  //         {participantIds.length === 2 && !equalLayout && (
  //           <div
  //             className={`absolute bottom-2 right-2  cursor-pointer ${
  //               largerView ? "text-blue-500" : "text-gray-500"
  //             }`}
  //             onClick={toggleView}
  //             style={{ fontSize: "25px" ,zIndex: 50}}
  //             title={largerView ? "Zoom In" : "Zoom Out"}
  //           >

  //             {largerView ?  <MdOutlineZoomOutMap />:<MdOutlineZoomInMap />}
  //           </div>

  //         )}
  //         {participantIds.length === 2 && (

  //           <LayoutOptionsDropdown
  //             onChangeLayout={() => {

  //               console.log("Change Layout clicked");
  //               setEqualLayout(!equalLayout);
  //             }}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   );
  // }



  return (
    <div
      className={`relative flex flex-col md:flex-row flex-grow m-3 items-center justify-center ${participantIds.length === 1 ? "md:px-6 md:py-1" : "md:px-16 md:py-4"
        } ${equalLayout
          ? "grid grid-cols-2 gap-4 md:w-44 xl:w-56"
          : ""
        }`}
    >
      <div className="relative flex flex-col w-full h-full">
        {participantIds.map((participantId, i) => (
          <div
            key={`participant_${participantId}`}
            className={`flex ${participantIds.length === 1
                ? "absolute inset-0"
                : i === 1
                  ? largerView
                    ? "absolute inset-3"
                    : " absolute bottom-0 right-0"
                  : i === 0
                    ? largerView
                      ? " absolute bottom-0 right-0"
                      : "absolute inset-3"
                    : " absolute bottom-0 right-0"
              } ${participantIds.length === 1
                ? "h-full w-full border border-white rounded-md z-10"
                : i === 0
                  ? equalLayout
                    ? "col-span-2 z-50 border border-white rounded-md "
                    // : equalLayout
                    // ? "col-span-1 z-50 border border-white rounded-md " 
                    : largerView
                      ? "md:h-32 md:w-32 xl:w-40 xl:h-40 border border-white rounded-md z-20"
                      : "md:h-full md:w-full xl:w-full xl:h-full border border-white rounded-md z-10"

                  : largerView
                    ? "md:h-full md:w-full xl:w-full xl:h-full border border-white rounded-md z-10"
                    : "md:h-32 md:w-32 xl:w-40 xl:h-40 border border-white rounded-md z-20"
              } overflow-clip overflow-hidden p-1`}
          >
            <MemoizedParticipant participantId={participantId} />
          </div>
        ))}
        {participantIds.length === 2 && !equalLayout && (
          <div
            className={`absolute bottom-2 right-2  cursor-pointer ${largerView ? "text-blue-500" : "text-gray-500"
              }`}
            onClick={toggleView}
            style={{ fontSize: "25px", zIndex: 50 }}
            title={largerView ? "Zoom In" : "Zoom Out"}
          >

            {largerView ? <MdOutlineZoomOutMap /> : <MdOutlineZoomInMap />}
          </div>

        )}

        {participantIds.length === 1 && (
          <button
            className="absolute bottom-2 right-2 cursor-pointer text-blue-500"
            onClick={() => {
              console.log("Button clicked for a single participant");
              notifycaller(storedCode);
              console.log(storedCode);
              
            }}
            style={{ fontSize: "25px", zIndex: 50 }}
            title="Your Button Title"
          >
            <FcVideoCall />
          </button>
        )}

        {participantIds.length === 2 && (

          <LayoutOptionsDropdown
            onChangeLayout={() => {

              console.log("Change Layout clicked");
              setEqualLayout(!equalLayout);
            }}

          />
        )}

      </div>
      {/* <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
/> */}
    </div>
    
  );
}


//******************************************************************************************* */



export const MemoizedParticipantGrid = React.memo(
  ParticipantGrid,
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.participantIds) ===
      JSON.stringify(nextProps.participantIds) &&
      prevProps.isPresenting === nextProps.isPresenting
    );
  }
);
