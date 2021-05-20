FROM python:3.8.5

RUN apt-get update && apt-get install -y \
    bash \
    gcc \
    make \
    python3-dev

COPY requirements.txt /code/requirements.txt

RUN pip install -r /code/requirements.txt

COPY . code
WORKDIR /code

EXPOSE 8000

CMD ["./manage.py", "runserver", "localhost:8000"]
