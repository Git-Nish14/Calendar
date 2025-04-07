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
import { useEffect, useRef, useContext, useState } from "react";
import { SocketContext } from "@/app/SocketProviderWrapper";
import { motion } from "framer-motion";

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
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [activeView, setActiveView] = useState("dayGridMonth");
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;

  const changeView = (viewName: string) => {
    setActiveView(viewName);
    calendarRef.current?.getApi().changeView(viewName);
    if (isMobile) {
      setIsControlsOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getEventColor = (event: any) => {
    if (event.source && event.source.id === "festivals") {
      return {
        backgroundColor: theme === "light" ? "#8B5CF6" : "#C4B5FD",
        textColor: theme === "light" ? "#FFFFFF" : "#1E1B4B",
        borderColor: "#4C1D95"
      };
    }

    // Default colors for other events
    return {
      backgroundColor: theme === "light" ? "#3B82F6" : "#93C5FD",
      textColor: theme === "light" ? "#FFFFFF" : "#1E3A8A",
      borderColor: "#1D4ED8"
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 ${theme === "light"
          ? "bg-gradient-to-br from-white to-blue-50"
          : "bg-gradient-to-br from-gray-900 to-blue-900 text-white"
        }`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 border-b border-opacity-20 border-blue-400">
        <div className="flex items-center mb-3 sm:mb-0">
          <h2 className={`text-xl font-bold ${theme === "light" ? "text-blue-800" : "text-blue-200"}`}>
            {calendarRef.current?.getApi().view.title || "Calendar"}
          </h2>
          <button
            onClick={toggleTheme}
            className={`ml-3 p-2 rounded-full transition-colors ${theme === "light"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                : "bg-blue-800 text-blue-100 hover:bg-blue-700"
              }`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {!isMobile && (
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => calendarRef.current?.getApi().prev()}
              className={`px-3 py-1 rounded transition-colors ${theme === "light"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : "bg-blue-800 text-blue-100 hover:bg-blue-700"
                }`}
            >
              &lt; Prev
            </button>
            <button
              onClick={() => calendarRef.current?.getApi().today()}
              className={`px-3 py-1 rounded transition-colors ${theme === "light"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : "bg-blue-800 text-blue-100 hover:bg-blue-700"
                }`}
            >
              Today
            </button>
            <button
              onClick={() => calendarRef.current?.getApi().next()}
              className={`px-3 py-1 rounded transition-colors ${theme === "light"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : "bg-blue-800 text-blue-100 hover:bg-blue-700"
                }`}
            >
              Next &gt;
            </button>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className={`p-2 rounded ${theme === "light"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                : "bg-blue-800 text-blue-100 hover:bg-blue-700"
              }`}
          >
            {isControlsOpen ? "✕ Close" : "☰ Menu"}
          </button>
        )}
      </div>

      {/* View Controls for Desktop */}
      {!isMobile && (
        <div className="flex justify-center p-2 border-b border-opacity-20 border-blue-400">
          <div className="flex gap-1 rounded-lg p-1 bg-opacity-20 bg-blue-200">
            {["multiMonthYear", "dayGridMonth", "timeGridWeek", "timeGridDay"].map((view) => (
              <button
                key={view}
                onClick={() => changeView(view)}
                className={`px-3 py-1 rounded transition-colors ${activeView === view
                    ? theme === "light"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-300 text-blue-900"
                    : theme === "light"
                      ? "bg-transparent text-blue-800 hover:bg-blue-100"
                      : "bg-transparent text-blue-100 hover:bg-blue-800"
                  }`}
              >
                {view === "multiMonthYear" && "Year"}
                {view === "dayGridMonth" && "Month"}
                {view === "timeGridWeek" && "Week"}
                {view === "timeGridDay" && "Day"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Controls Overlay */}
      {isMobile && isControlsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed inset-0 z-50 ${theme === "light" ? "bg-white bg-opacity-95" : "bg-gray-900 bg-opacity-95"
            }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6 p-4">
            <h3 className={`text-xl font-bold ${theme === "light" ? "text-blue-800" : "text-blue-200"}`}>
              Calendar Controls
            </h3>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <button
                onClick={() => calendarRef.current?.getApi().prev()}
                className={`px-4 py-3 rounded-lg shadow-md transition-colors ${theme === "light"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    : "bg-blue-800 text-blue-100 hover:bg-blue-700"
                  }`}
              >
                &lt; Previous
              </button>

              <button
                onClick={() => calendarRef.current?.getApi().next()}
                className={`px-4 py-3 rounded-lg shadow-md transition-colors ${theme === "light"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    : "bg-blue-800 text-blue-100 hover:bg-blue-700"
                  }`}
              >
                Next &gt;
              </button>
            </div>

            <button
              onClick={() => calendarRef.current?.getApi().today()}
              className={`px-4 py-3 w-full max-w-sm rounded-lg shadow-md transition-colors ${theme === "light"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-300 text-blue-900 hover:bg-blue-200"
                }`}
            >
              Today
            </button>

            <div className="w-full max-w-sm pt-4 border-t border-blue-200 border-opacity-20">
              <h4 className={`text-center mb-3 ${theme === "light" ? "text-blue-800" : "text-blue-200"}`}>
                View Options
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {["multiMonthYear", "dayGridMonth", "timeGridWeek", "timeGridDay"].map((view) => (
                  <button
                    key={view}
                    onClick={() => changeView(view)}
                    className={`px-3 py-3 rounded-lg shadow-md transition-colors ${activeView === view
                        ? theme === "light"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-300 text-blue-900"
                        : theme === "light"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : "bg-blue-800 text-blue-100 hover:bg-blue-700"
                      }`}
                  >
                    {view === "multiMonthYear" && "Year View"}
                    {view === "dayGridMonth" && "Month View"}
                    {view === "timeGridWeek" && "Week View"}
                    {view === "timeGridDay" && "Day View"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsControlsOpen(false)}
              className={`mt-6 px-4 py-2 rounded-full ${theme === "light"
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
            >
              Close Menu
            </button>
          </div>
        </motion.div>
      )}

      {/* Calendar Container */}
      <div
        className={`h-full max-h-[calc(100vh-200px)] overflow-auto ${theme === "light" ? "fc-theme-standard" : "fc-theme-dark"
          }`}
        style={{
          // Custom scrollbar styles
          scrollbarWidth: 'thin',
          scrollbarColor: theme === "light" ? '#CBD5E1 #F1F5F9' : '#475569 #1E293B'
        }}
      >
        <div className={`p-2 sm:p-4 ${theme === "dark" ? "fc-dark-theme" : ""}`}>
          <style jsx global>{`
            /* Global styles for dark theme */
            .fc-dark-theme .fc-day {
              background-color: #1E293B !important;
            }
            .fc-dark-theme .fc-day-other {
              background-color: #0F172A !important;
            }
            .fc-dark-theme .fc-col-header-cell {
              background-color: #334155 !important;
              color: #F1F5F9 !important;
            }
            .fc-dark-theme .fc-toolbar-title {
              color: #F1F5F9 !important;
            }
            .fc-dark-theme .fc-button {
              background-color: #334155 !important;
              border-color: #475569 !important;
            }
            
            /* Custom event styling */
            .custom-event {
              border-radius: 4px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              transition: transform 0.2s, box-shadow 0.2s;
              overflow: hidden;
            }
            .custom-event:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 6px rgba(0,0,0,0.15);
            }
            
            /* Better cell styling */
            .fc .fc-daygrid-day {
              transition: background-color 0.2s;
            }
            .fc .fc-daygrid-day:hover {
              background-color: ${theme === "light" ? "rgba(239, 246, 255, 0.8)" : "rgba(30, 41, 59, 0.8)"};
            }
            
            /* Today highlight */
            .fc .fc-day-today {
              background-color: ${theme === "light" ? "rgba(219, 234, 254, 0.7) !important" : "rgba(30, 58, 138, 0.4) !important"};
              border-top: 2px solid ${theme === "light" ? "#3B82F6" : "#93C5FD"} !important;
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
              .fc .fc-toolbar-title {
                font-size: 1.2rem !important;
              }
              .fc .fc-col-header-cell-cushion {
                font-size: 0.8rem;
              }
            }
          `}</style>

          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              multiMonthPlugin,
            ]}
            headerToolbar={false} // We're implementing our own header
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
            initialView={isMobile ? "dayGridMonth" : "dayGridMonth"}
            contentHeight="auto"
            dayHeaderFormat={{
              weekday: isMobile ? "narrow" : "short",
              month: "numeric",
              day: "numeric",
            }}
            eventClassNames="custom-event"
            dayCellDidMount={(info) => cellStyle(info)}
            eventContent={(arg) => {
              const colors = getEventColor(arg.event);
              return (
                <div
                  className="whitespace-normal break-words text-xs p-1 rounded-sm w-full"
                  style={{
                    backgroundColor: colors.backgroundColor,
                    color: colors.textColor,
                    borderLeft: `3px solid ${colors.borderColor}`,
                    whiteSpace: "normal",
                    fontSize: isMobile ? "0.7rem" : "0.8rem",
                    lineHeight: "1.2"
                  }}
                >
                  {arg.timeText && (
                    <div className="font-medium">
                      {arg.timeText}
                    </div>
                  )}
                  <div className="font-medium">
                    {arg.event.title}
                  </div>
                </div>
              );
            }}
            views={{
              dayGrid: {
                dayMaxEventRows: isMobile ? 2 : isTablet ? 3 : 4,
              },
              multiMonthYear: {
                multiMonthMaxColumns: isMobile ? 1 : isTablet ? 2 : 3,
              },
              timeGrid: {
                nowIndicator: true,
                slotEventOverlap: false,
              }
            }}
          />
        </div>
      </div>

      {/* Bottom Legend */}
      <div className={`p-3 flex flex-wrap justify-center gap-3 border-t border-opacity-20 border-blue-400 ${theme === "light" ? "bg-blue-50" : "bg-blue-900"
        }`}>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{
            backgroundColor: theme === "light" ? "#3B82F6" : "#93C5FD",
          }}></span>
          <span className="text-xs">Events</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{
            backgroundColor: theme === "light" ? "#8B5CF6" : "#C4B5FD",
          }}></span>
          <span className="text-xs">Festivals</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 mr-1 rounded-sm" style={{
            backgroundColor: theme === "light" ? "rgba(219, 234, 254, 0.7)" : "rgba(30, 58, 138, 0.4)",
            borderTop: `2px solid ${theme === "light" ? "#3B82F6" : "#93C5FD"}`
          }}></span>
          <span className="text-xs">Today</span>
        </div>
      </div>
    </motion.div>
  );
}