FROM python:alpine
RUN pip install Flask
RUN pip install hashlib
COPY hasher.py /
CMD ["python", "hasher.py"]
EXPOSE 80
