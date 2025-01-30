export const handleEventDrop = async (
    eventDropInfo: any,
    updateEvent: any,
    refetch: any
) => {
    const { id } = eventDropInfo.event;
    const start = eventDropInfo.event.start?.toISOString();
    const end = eventDropInfo.event.end?.toISOString();
    if (!start || !end) {
      alert("Invalid date range for the event.");
      return;
    }
    try {
      await updateEvent({
        variables: {
          id,
          title: eventDropInfo.event.title,
          description: eventDropInfo.event.description,
          start,
          end,
        },
      });
      // alert("Event updated successfully after drag-and-drop.");
      await refetch();
    } catch (err) {
      console.error("Error updating event on drop:", err);
      alert("Failed to update event.");
    }
  };
