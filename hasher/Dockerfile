FROM python:alpine
RUN pip install Flask
RUN pip easy_install hashlib
COPY hasher.py /
CMD ["python", "hasher.py"]
EXPOSE 80
