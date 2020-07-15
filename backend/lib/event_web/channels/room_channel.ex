defmodule EventWeb.RoomChannel do
  use EventWeb, :channel

  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("shout", %{"message" => message} = payload, socket) do
    broadcast(socket, "shout", payload)
    broadcast(socket, "other", %{sender: "server", message: message})
    {:noreply, socket}
  end
end
