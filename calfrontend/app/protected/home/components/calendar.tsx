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
import { UPDATE_EVENT } from "@/app/graphql/mutations";
import { cellStyle } from "../hooks/cellStyle";
import { useEffect, useRef } from "react";

export default function Calendar({
  events,
  data,
  refetch,
  setFormData,
  setSelectedEvent,
  setGotoDate,
}: any) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [updateEvent] = useMutation(UPDATE_EVENT);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setGotoDate(() => (date: string | Date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0]; // Ensure correct format
        console.log("Navigating to:", formattedDate);
        calendarApi.gotoDate(formattedDate);
      });
    }
  }, [setGotoDate]);

  return (
    <FullCalendar
      ref={calendarRef} // Attach the ref
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        multiMonthPlugin,
      ]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
      }}
      dayCellDidMount={(info) => {
        cellStyle(info);
      }}
      timeZone="UTC"
      height="100%"
      selectable={true}
      editable={true}
      eventResizableFromStart={true}
      events={[...events, ...festivals]}
      eventClick={(info) =>
        handleEventClick(info, data, setSelectedEvent, setFormData)
      }
      eventDrop={(eventDropInfo) =>
        handleEventDrop(eventDropInfo, updateEvent, refetch)
      }
      dateClick={(info) => handleDateClick(info, setFormData, setSelectedEvent)}
      select={(info) => handleSelect(info, setFormData)}
      eventResize={(eventResizeInfo) =>
        handleEventResize(eventResizeInfo, updateEvent, refetch)
      }
    />
  );
}
