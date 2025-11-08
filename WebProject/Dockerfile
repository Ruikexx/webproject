# 使用轻量级 Nginx 镜像
FROM nginx:alpine

# 把当前目录下的所有文件复制到 Nginx 默认网页目录
COPY . /usr/share/nginx/html

# 暴露容器的 80 端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
