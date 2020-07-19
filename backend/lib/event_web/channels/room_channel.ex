defmodule EventWeb.RoomChannel do
  use EventWeb, :channel

  def join("room:lobby", _payload, socket) do
    {:ok, :join, socket}
  end

  def join("some_channel:" <> topic_id, _payload, socket) do
    {:ok, %{chan: "some_channel:#{topic_id}"}, assign(socket, :topic_id, topic_id)}
  end

  def handle_in("shout", %{"message" => message} = payload, socket) do
    # broadcast(socket, "shout", payload)
    broadcast(socket, "газирумгарумге", payload)

    EventWeb.Endpoint.broadcast_from!(self(), "some_channel:topic", "other", %{
      sender: "server",
      message: "server handled: " <> message
    })

    # {:noreply, socket}
    # Reply only to sender
    {:reply, {:ok, payload}, socket}
  end
end
