from queue import Queue

# Queue that stores upload status messages
status_queue = Queue()


def update_status(message: str):
    """
    Push a new upload status.
    """
    status_queue.put(message)