FROM python:alpine
RUN pip install redis
RUN pip install requests
COPY worker/worker.py /
CMD ["python", "worker.py"]
