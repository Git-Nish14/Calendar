import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { handleSelect } from "../hooks/Select";
import { handleDateClick } from "../hooks/dateClick";
import { handleEventClick } from "../hooks/eventClick";
import { handleEventDrop } from "../hooks/eventDrop";
import { handleEventResize } from "../hooks/eventResize";
import { festivals } from "@/festival";
import { useMutation } from "@apollo/client";
import { UPDATE_EVENT } from "@/graphql/mutations";
import { cellStyle } from "../hooks/cellStyle";
import { useEffect, useRef, useContext } from "react";
import { SocketContext } from "@/app/SocketProviderWrapper";

export default function Calendar({
  events,
  data,
  refetch,
  setFormData,
  setSelectedEvent,
  setGotoDate,
}: any) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [updateEvent] = useMutation(UPDATE_EVENT, {
    fetchPolicy: "network-only",
  });
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setGotoDate(() => (date: string | Date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        console.log("Navigating to:", formattedDate);
        calendarApi.gotoDate(formattedDate);
      });
    }
  }, [setGotoDate]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newEvent", (event: any) => {
      console.log("New event received via Socket.io:", event);
      refetch();
    });

    socket.on("updateEvent", (event: any) => {
      console.log("Event updated via Socket.io:", event);
      refetch();
    });

    socket.on("deleteEvent", (event: any) => {
      console.log("Event deleted via Socket.io:", event);
      refetch();
    });

    return () => {
      socket.off("newEvent");
      socket.off("updateEvent");
      socket.off("deleteEvent");
    };
  }, [socket, refetch]);

  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <div className=" h-full max-h-[calc(100vh-180px)] sm:overflow-y-auto sm:overflow-x-hidden overflow-x-auto">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            multiMonthPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dayCellDidMount={(info) => cellStyle(info)}
          timeZone="UTC"
          height="auto"
          selectable={true}
          editable={true}
          eventResizableFromStart={true}
          events={[...events, ...festivals]}
          eventClick={(info) =>
            handleEventClick(info, data, setSelectedEvent, setFormData)
          }
          eventDrop={(eventDropInfo) =>
            handleEventDrop(eventDropInfo, updateEvent, refetch, socket)
          }
          dateClick={(info) =>
            handleDateClick(info, setFormData, setSelectedEvent)
          }
          select={(info) => handleSelect(info, setFormData)}
          eventResize={(eventResizeInfo) =>
            handleEventResize(eventResizeInfo, updateEvent, refetch, socket)
          }
          initialView={
            window.innerWidth < 768 ? "dayGridMonth" : "dayGridMonth"
          }
          contentHeight="auto"
          dayHeaderFormat={{
            weekday: "short",
            month: "numeric",
            day: "numeric",
          }}
          eventContent={(arg) => (
            <div
              className="whitespace-normal break-words text-xs max-w-full"
              style={{ whiteSpace: "normal" }}
            >
              {arg.event.title}
            </div>
          )}
          views={{
            dayGrid: {
              dayMaxEventRows: 3,
            },
            multiMonthYear: {
              multiMonthMaxColumns: window.innerWidth < 1024 ? 1 : 3,
            },
          }}
        />
      </div>
    </div>
  );
}
