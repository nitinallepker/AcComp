from fastapi import APIRouter
from sse_starlette.sse import EventSourceResponse
from services.upload_status import status_queue
import asyncio

router = APIRouter()


async def event_generator():

    while True:

        if not status_queue.empty():

            message = status_queue.get()

            yield {
                "event": "status",
                "data": message
            }

            if message == "Completed":
                break

        await asyncio.sleep(0.1)


@router.get("/upload-status")
async def upload_status():

    return EventSourceResponse(
        event_generator()
    )