defmodule EventWeb.RoomChannel do
  use EventWeb, :channel

  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  def join("some_channel:" <> topic_id, _payload, socket) do
    {:ok, %{chan: "some_channel:#{topic_id}"}, assign(socket, :topic_id, topic_id)}
  end

  def handle_in("shout", %{"message" => message} = payload, socket) do
    IO.inspect(socket)
    IO.inspect(payload)
    broadcast(socket, "shout", payload)

    EventWeb.Endpoint.broadcast_from!(self(), "some_channel:topic", "other", %{
      sender: "server",
      message: message
    })

    {:noreply, socket}
  end
end
