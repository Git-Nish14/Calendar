export const handleSubmit = async (
    e: React.FormEvent,
    validateEventTimes:any,
    formData:any,
    createEvent:any,
    data:any,
    setFormData:any,
    refetch:any
) => {
    e.preventDefault();
    if (!validateEventTimes()) {
      alert("Start time must be earlier than end time.");
      return;
    }
    const { title, description, start, end } = formData;
    if (!title || !description || !start || !end) {
      alert("Please fill in all fields");
      return;
    }
    console.log(new Date(start + "Z").toISOString());
    try {
      console.log(start);
      const { data: eventData } = await createEvent({
        variables: {
          userId: data?.user?.id,
          start: new Date(start + "Z").toISOString(), // Ensure it's ISO format
          end: new Date(end + "Z").toISOString(), // Ensure it's ISO format
          description,
          title,
        },
      });
      console.log("Event created:", eventData.createEvent);
      await refetch();
      setFormData({ title: "", description: "", start: "", end: "" });
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };