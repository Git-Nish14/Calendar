"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import Calendar from "../../components/calendar";
import EventList from "../../components/eventList";
import Form from "../../components/form";
import { SocketContext } from "@/app/SocketProviderWrapper";
import CalendoLoader from "@/components/Loading";
import { motion, AnimatePresence } from "framer-motion";

interface EventFormData {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
}

export default function CalendarPage() {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });
  const router = useRouter();
  const socket = useContext(SocketContext);
  const [formData, setFormData] = useState<EventFormData>({
    id: "",
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<EventFormData | null>(null);
  const [gotoDate, setGotoDate] = useState<(date: string | Date) => void>(() => () => { });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [viewMode, setViewMode] = useState("calendar"); // calendar, list, split, focus
  const [calendarKey, setCalendarKey] = useState(0); // Key for forcing calendar refresh
  const mainRef = useRef<HTMLDivElement>(null);

  // Theme colors
  const themes = {
    default: {
      primary: "bg-indigo-600",
      secondary: "bg-indigo-100",
      accent: "bg-amber-500",
      text: "text-gray-800",
      buttonHover: "hover:bg-indigo-700",
    },
    dark: {
      primary: "bg-gray-800",
      secondary: "bg-gray-700",
      accent: "bg-teal-400",
      text: "text-white",
      buttonHover: "hover:bg-gray-900",
    },
    nature: {
      primary: "bg-emerald-600",
      secondary: "bg-emerald-100",
      accent: "bg-amber-400",
      text: "text-gray-800",
      buttonHover: "hover:bg-emerald-700",
    },
  };

  const currentThemeColors = themes[currentTheme as keyof typeof themes];

  useEffect(() => {
    if (!socket) return;
    socket.on("newEvent", () => refetch());
    socket.on("updateEvent", () => refetch());
    socket.on("deleteEvent", () => refetch());
    return () => {
      socket.off("newEvent");
      socket.off("updateEvent");
      socket.off("deleteEvent");
    };
  }, [socket, refetch]);

  useEffect(() => {
    // Scroll to the selected event in focus mode
    if (selectedEvent && mainRef.current && viewMode === "focus") {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedEvent, viewMode]);

  // Force calendar refresh when view mode or sidebar state changes
  useEffect(() => {
    // Using a small timeout to ensure DOM updates before refreshing calendar
    const timer = setTimeout(() => {
      setCalendarKey(prevKey => prevKey + 1);
    }, 50);

    return () => clearTimeout(timer);
  }, [viewMode, sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);

    // Refresh calendar on theme change
    setCalendarKey(prevKey => prevKey + 1);
  };

  const cycleViewMode = () => {
    const modes = ["calendar", "list", "focus"];
    // "split",
    const currentIndex = modes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  if (loading) return <CalendoLoader />;
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md text-center">
        <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Connection Error</h1>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const events =
    data?.user?.events?.map((event: EventFormData) => ({
      id: event.id,
      description: event.description,
      title: event.title,
      start: event.start,
      end: event.end,
    })) || [];

  const getViewModeLabel = () => {
    switch (viewMode) {
      case 'calendar': return 'Calendar View';
      case 'list': return 'List View';
      case 'split': return 'Split View';
      case 'focus': return 'Focus Mode';
      default: return 'Calendar';
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className={`w-14 h-14 rounded-full ${currentThemeColors.primary} text-white shadow-lg flex items-center justify-center`}
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={cycleTheme}
          className={`w-14 h-14 rounded-full ${currentThemeColors.primary} text-white shadow-lg flex items-center justify-center`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={cycleViewMode}
          className={`w-14 h-14 rounded-full ${currentThemeColors.primary} text-white shadow-lg flex items-center justify-center`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* Top header with view mode indicator */}
      <div className={`sticky top-0 z-20 ${currentThemeColors.primary} text-white py-3 px-4 flex justify-between items-center shadow-md`}>
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Calendo</h1>
          <div className={`ml-4 py-1 px-3 rounded-full ${currentThemeColors.accent} text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-800' : 'text-white'}`}>
            {getViewModeLabel()}
          </div>
        </div>
        <div className="flex items-center">
          {data?.user && (
            <span className="mr-3 hidden sm:inline">{data.user.firstName} {data.user.lastName}</span>
          )}
          <div className="w-8 h-8 rounded-full bg-white text-indigo-700 flex items-center justify-center font-bold">
            {data?.user?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>

      {/* Main layout container */}
      <div className="flex flex-col md:flex-row relative">
        {/* Sidebar component with animation */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`${viewMode === 'focus' ? 'hidden' : 'block'
                } sidebar w-full md:w-80 lg:w-96 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg rounded-r-2xl flex flex-col overflow-hidden z-10
              ${viewMode === 'split' ? 'md:max-h-screen' : 'md:h-[calc(100vh-56px)]'} 
              sticky top-14`}
            >
              <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className={`p-5 ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-300`}>
                  <Form
                    data={data}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                    setFormData={setFormData}
                    formData={formData}
                    refetch={refetch}
                  />
                </div>
                <div className="p-5 pt-0">
                  <EventList
                    router={router}
                    events={events}
                    gotoDate={gotoDate}
                    refetch={refetch}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <div
          ref={mainRef}
          className={`main-content w-full ${viewMode === 'focus' || !sidebarOpen ? 'md:w-full' : 'md:w-[calc(100%-384px)]'
            } p-4 transition-all duration-300 ${viewMode === 'split' ? 'h-[50vh] md:h-[calc(100vh-56px)]' : 'min-h-[calc(100vh-56px)]'
            }`}
        >
          {/* Conditional rendering based on view mode */}
          {(viewMode === 'calendar' || viewMode === 'split' || viewMode === 'focus') && (
            <div className={`rounded-xl overflow-hidden shadow-lg ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} h-full transition-colors duration-300`}>
              <Calendar
                key={calendarKey} // Force re-render when key changes
                events={events}
                data={data}
                refetch={refetch}
                setFormData={setFormData}
                setSelectedEvent={setSelectedEvent}
                setGotoDate={setGotoDate}
              />
            </div>
          )}

          {/* Only show list view when in list or split mode */}
          {(viewMode === 'list' || viewMode === 'split') && (
            <div className={`rounded-xl overflow-hidden shadow-lg ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} 
            ${viewMode === 'split' ? 'mt-4' : ''} p-5 max-h-[60vh] overflow-y-auto transition-colors duration-300`}>
              <h2 className="text-xl font-bold mb-4">All Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length === 0 ? (
                  <div className="col-span-full text-center p-8">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">No events to display</p>
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className={`mt-4 px-4 py-2 ${currentThemeColors.primary} text-white rounded-lg ${currentThemeColors.buttonHover} transition`}
                    >
                      Create New Event
                    </button>
                  </div>
                ) : (
                  events.map((event: EventFormData) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg ${currentThemeColors.secondary} shadow hover:shadow-md transition-shadow cursor-pointer`}
                      onClick={() => {
                        setSelectedEvent(event);
                        setFormData(event);
                        if (viewMode !== 'split') setSidebarOpen(true);
                      }}
                    >
                      <h3 className="font-bold truncate">{event.title}</h3>
                      <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1 truncate`}>
                        {event.description}
                      </p>
                      <div className="mt-2 text-xs">
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {new Date(event.start).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Focus mode - Display selected event in detail */}
          {viewMode === 'focus' && selectedEvent && (
            <div className={`mt-6 p-6 rounded-xl shadow-lg ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <h2 className="text-3xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="text-lg mb-6">{selectedEvent.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`p-4 rounded-lg ${currentThemeColors.secondary}`}>
                  <h3 className="font-semibold mb-2">Start Time</h3>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {new Date(selectedEvent.start).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center mt-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {new Date(selectedEvent.start).toLocaleTimeString()}
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${currentThemeColors.secondary}`}>
                  <h3 className="font-semibold mb-2">End Time</h3>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {new Date(selectedEvent.end).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center mt-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {new Date(selectedEvent.end).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 ${currentThemeColors.primary} text-white rounded-lg ${currentThemeColors.buttonHover} transition`}
                >
                  Back to Calendar
                </button>
                <button
                  onClick={() => {
                    setFormData(selectedEvent);
                    setSidebarOpen(true);
                    setViewMode('calendar');
                  }}
                  className={`px-4 py-2 ${currentThemeColors.primary} text-white rounded-lg ${currentThemeColors.buttonHover} transition`}
                >
                  Edit Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responsive reminder for mobile */}
      <AnimatePresence>
        {viewMode === 'calendar' && !sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed top-16 left-4 right-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-3 z-20 flex items-center"
          >
            <div className="bg-amber-400 rounded-full p-2 mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-700 dark:text-gray-300">Open the sidebar to create or edit events</p>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="ml-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm"
            >
              Open
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}