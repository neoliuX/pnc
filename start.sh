#!/bin/bash

# 移动依赖文件
{
    mv ${CODE_HOME}${PROJECT}/web.conf ${NGINX_HOME}
}


if [ -n "$CRONTAB" ]; then
    install -o root -g root -m 600  /data/html/${PROJECT}/crontab /var/spool/cron/root
    sed -i '/.*pam_loginuid.so/s/required/sufficient/g' /etc/pam.d/crond
    /usr/sbin/crond -i -n -x ext
fi

if [ -n "$SUPERVISORD" ]; then
    rm -f /etc/supervisord.d/*
    cp -a *-supervisord.ini /etc/supervisord.d/
fi

/app/sbin/nginx -c /app/conf/nginx/nginx.conf -g "daemon off; error_log /dev/stderr info;"
