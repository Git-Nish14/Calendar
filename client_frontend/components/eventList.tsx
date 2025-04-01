import { useMutation } from "@apollo/client";
import { handleEventLogout } from "../hooks/logout";
import { DELETE_EVENT } from "@/graphql/mutations";
import { useEffect, useContext } from "react";
import { SocketContext } from "@/app/SocketProviderWrapper";

export default function EventList({ events, router, gotoDate, refetch }: any) {
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const socket = useContext(SocketContext);

  function handleListItemClick(event: any) {
    console.log("Navigating to event:", event);
    const eventDate = new Date(event.start).toISOString().split("T")[0];
    gotoDate(eventDate);
  }

  async function handleListItemDelete(id: any) {
    await deleteEvent({ variables: { id } });
    refetch();
    socket?.emit("deleteEvent", { id });
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("deleteEvent", (event: any) => {
      console.log("Event deleted via Socket.io:", event);
      refetch();
    });

    return () => {
      socket.off("deleteEvent");
    };
  }, [socket, refetch]);

  return (
    <>
      <div className="mt-4 flex-1 overflow-y-auto max-h-[400px] bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h4 className="font-semibold text-gray-700 mb-2 text-center">
          Your Events:
        </h4>
        <div className="overflow-y-auto max-h-[300px] sm:max-h-[500px] bg-gray-100 rounded-lg p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {events.length === 0 ? (
            <div className="flex justify-center items-center h-full text-lg text-gray-600">
              No events to display
            </div>
          ) : (
            <ul className="space-y-4">
              {events.map((event: any) => (
                <li
                  key={event.id}
                  onClick={() => handleListItemClick(event)}
                  className="border border-gray-300 p-4 rounded-lg hover:shadow-md hover:bg-gray-100 transition duration-300 cursor-pointer flex justify-between items-start"
                >
                  <div className="flex-1">
                    <strong className="text-lg text-gray-800">
                      {event.title}
                    </strong>
                    <p className="text-sm text-gray-700 mt-1 mb-2">
                      {event.description}
                    </p>
                    <div className="text-xs text-gray-600">
                      <span>
                        Start:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }).format(new Date(event.start))}
                      </span>
                      <br />
                      <span>
                        End:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }).format(new Date(event.end))}
                      </span>
                    </div>
                  </div>
                  <button
                    className="ml-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300 transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleListItemDelete(event.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-white"
                    >
                      <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z"></path>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={() => handleEventLogout(router)}
        className="w-full bg-red-500 text-white p-3 rounded-lg mt-6 hover:bg-red-600 transition duration-200"
      >
        Log out
      </button>
    </>
  );
}
