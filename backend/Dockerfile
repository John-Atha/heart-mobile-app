FROM python:3.8-slim

RUN useradd -ms /bin/bash user

WORKDIR /home/user/app

USER user

ENV PATH /home/user/.local/bin:$PATH

RUN pip install --upgrade pip
COPY --chown=user requirements.txt .
RUN pip install -r requirements.txt
COPY --chown=user . .

EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000
