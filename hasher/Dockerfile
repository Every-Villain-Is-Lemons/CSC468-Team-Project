FROM python:alpine
RUN pip install Flask
RUN pip install --upgrade setuptools
RUN pip install ez_setup
Run pip install hashlib
COPY hasher.py /
CMD ["python", "hasher.py"]
EXPOSE 80
