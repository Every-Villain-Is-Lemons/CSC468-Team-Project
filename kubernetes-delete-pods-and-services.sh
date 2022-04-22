#!/bin/bash

# just deletes all services, deployments, and namespace for a clean slate
kubectl delete svc generator
kubectl delete svc hasher
kubectl delete svc redis
kubectl delete svc registry
kubectl delete svc rng
kubectl delete svc webui

kubectl delete deploy generator
kubectl delete deploy hasher
kubectl delete deploy redis
kubectl delete deploy registry
kubectl delete deploy rng
kubectl delete deploy webui
kubectl delete deploy worker

# delete everything in Jenkins ns but Jenkins
# delete from jenkins ns
kubectl delete svc generator -n jenkins
kubectl delete svc hasher -n jenkins
kubectl delete svc redis -n jenkins
kubectl delete svc registry -n jenkins
kubectl delete svc rng -n jenkins
kubectl delete svc webui -n jenkins

kubectl delete deploy generator -n jenkins
kubectl delete deploy hasher -n jenkins
kubectl delete deploy redis -n jenkins
kubectl delete deploy registry -n jenkins
kubectl delete deploy rng -n jenkins
kubectl delete deploy webui -n jenkins
kubectl delete deploy worker -n jenkins

# delete some files that are now in the head node
rm dashboard-insecure.yml
rm docker-compose.images.yml
rm docker-compose.yml
rm ramcoin-service.yml
rm socat.yml
rm docker-compose.logging.yml
rm ramcoin.yml

rm -r CSC468-Team-Project
rm -r ram_coin
# type 'y' two times




