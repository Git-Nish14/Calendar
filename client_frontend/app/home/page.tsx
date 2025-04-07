"use client";
import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import Calendar from "../../components/calendar";
import EventList from "../../components/eventList";
import Form from "../../components/form";
import { SocketContext } from "@/app/SocketProviderWrapper";
import CalendoLoader from "@/components/Loading";

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

  const [selectedEvent, setSelectedEvent] = useState<EventFormData | null>(
    null
  );
  const [gotoDate, setGotoDate] = useState<(date: string | Date) => void>(
    () => () => {}
  );

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

  if (loading) return <CalendoLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const events =
    data?.user?.events?.map((event: EventFormData) => ({
      id: event.id,
      description: event.description,
      title: event.title,
      start: event.start,
      end: event.end,
    })) || [];

  return (
    <div className="page-container flex flex-col md:flex-row min-h-screen bg-gray-100 overflow-y-auto">
      <div className="sidebar w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg flex flex-col overflow-y-auto mb-4 md:mb-0">
        <Form
          data={data}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setFormData={setFormData}
          formData={formData}
          refetch={refetch}
        />
        <EventList
          router={router}
          events={events}
          gotoDate={gotoDate}
          refetch={refetch}
        />
      </div>

      <div className="main-content w-full p-4">
        <Calendar
          events={events}
          data={data}
          refetch={refetch}
          setFormData={setFormData}
          setSelectedEvent={setSelectedEvent}
          setGotoDate={setGotoDate}
        />
      </div>
    </div>
  );
}
