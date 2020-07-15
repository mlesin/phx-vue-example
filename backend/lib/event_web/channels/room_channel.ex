defmodule EventWeb.RoomChannel do
  use EventWeb, :channel

  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  def join("some_channel:topic", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("shout", %{"message" => message} = payload, socket) do
    broadcast(socket, "shout", payload)

    EventWeb.Endpoint.broadcast_from!(self(), "some_channel:topic", "other", %{
      sender: "server",
      message: message
    })

    {:noreply, socket}
  end
end
