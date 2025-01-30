"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "@/app/graphql/queries";
import { useRouter } from "next/navigation";
import Calendar from "./components/calendar";
import EventList from "./components/eventList";
import Form from "./components/form";

interface EventFormData {
  title: string;
  description: string;
  start: string;
  end: string;
}

export default function CalendarPage() {
  const { data, loading, error, refetch } = useQuery(GET_USER);
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [gotoDate, setGotoDate] = useState<(date: string | Date) => void>(
    () => () => {}
  );
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }
  const events =
    data?.user?.events?.map((event: any) => ({
      id: event.id,
      description: event.description,
      title: event.title,
      start: event.start,
      end: event.end,
    })) || [];
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 p-6 h-full bg-white shadow-lg rounded-lg flex flex-col">
        <Form
          data={data}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setFormData={setFormData}
          formData={formData}
          refetch={refetch}
        />
        {/* -------------------------------------------------------------- */}
        <div id="eventList&Logout">
          <EventList
            router={router}
            events={events}
            gotoDate={gotoDate}
            refetch={refetch}
          />
        </div>
      </div>
      {/* -------------------------------------------------------------- */}
      <div id="Calendar" className="w-3/4 h-full p-9">
        <Calendar
          events={events}
          data={data}
          refetch={refetch}
          setFormData={setFormData}
          setSelectedEvent={setSelectedEvent}
          setGotoDate={setGotoDate}
        />
      </div>
      {/* -------------------------------------------------------------- */}
    </div>
  );
}
