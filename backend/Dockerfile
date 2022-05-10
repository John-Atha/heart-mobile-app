FROM python:3.8-alpine

RUN apk add --no-cache make build-base

RUN addgroup -S user && \
    adduser -S user -G user && \
    mkdir -p /home/user/app && \
    chown -R user:user /home/user


WORKDIR /home/user/app

USER user

ENV PATH /home/user/.local/bin:$PATH

RUN pip install --upgrade pip

COPY --chown=user requirements.txt .
RUN pip install -r requirements.txt
COPY --chown=user . .



EXPOSE 80
CMD python manage.py runserver 0.0.0.0:80
