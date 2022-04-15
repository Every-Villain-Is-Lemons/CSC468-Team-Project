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

# do it all for ramcoin namespace
kubectl delete svc generator -n ramcoin
kubectl delete svc hasher -n ramcoin
kubectl delete svc redis -n ramcoin
kubectl delete svc registry -n ramcoin
kubectl delete svc rng -n ramcoin
kubectl delete svc webui -n ramcoin

kubectl delete deploy generator -n ramcoin
kubectl delete deploy hasher -n ramcoin
kubectl delete deploy redis -n ramcoin
kubectl delete deploy registry -n ramcoin
kubectl delete deploy rng -n ramcoin
kubectl delete deploy webui -n ramcoin
kubectl delete deploy worker -n ramcoin

rm -r CSC468-Team-Project
rm -r ram_coin
# type 'y' two times




