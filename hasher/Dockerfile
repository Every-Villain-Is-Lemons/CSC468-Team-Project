FROM python:alpine
RUN pip install Flask
pip install --upgrade setuptools
pip install ez_setup
Run pip install hashlib
COPY hasher.py /
CMD ["python", "hasher.py"]
EXPOSE 80
