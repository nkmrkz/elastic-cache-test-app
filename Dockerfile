FROM public.ecr.aws/bitnami/node:14.15.1-debian-10-r8

ENV PORT=3000
EXPOSE 3000

WORKDIR /usr/src/app

COPY . .

RUN yarn

# RUN chmod 744 ./startup.sh

#CMD [ "./startup.sh" ]
CMD [ "yarn", "start" ]
