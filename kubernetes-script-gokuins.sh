#!/bin/bash

# launch network for Kubernetes (maybe?)
bash /local/repository/launch_network.sh

# deploy registry service - essentially a local version of Docker Hub
kubectl create deployment registry --image=registry
kubectl expose deploy/registry --port=5000 --type=NodePort

# patch the registry to use port 5000:30000
kubectl patch service registry --type='json' --patch='[{"op": "replace", "path": "/spec/ports/0/nodePort", "value":30000}]'

# clone GitHub repo into our Kubernetes network, cd into the folder
git clone https://github.com/tylerprehl/CSC468-Team-Project.git
cd ~/CSC468-Team-Project
sleep 30 # it's a picky bitch and needs some time

# use docker-compose.images.yml file to build Kubernetes images (objects?)
# for the GitHub components (webui, worker, hasher, generator)
docker-compose -f docker-compose.images.yml build
sleep 60
docker-compose -f docker-compose.images.yml push

# deploy and expose images
kubectl create deployment redis --image=redis
for SERVICE in hasher generator webui worker; do kubectl create deployment $SERVICE --image=127.0.0.2:30000/$SERVICE:v0.1; done
kubectl expose deployment redis --port 6379
kubectl expose deployment generator --port 80
kubectl expose deployment hasher --port 80
kubectl expose deploy/webui --type=NodePort --port=80

# patch the webui to use port 30080 to make life easier
kubectl patch service webui --type='json' --patch='[{"op": "replace", "path": "/spec/ports/0/nodePort", "value":30080}]'

# setup Kubernetes dashboard
kubectl apply -f dashboard-insecure.yaml
kubectl apply -f socat.yaml
kubectl get namespace
kubectl get svc --namespace=kubernetes-dashboard

# patch it to use port 30082
kubectl patch service kubernetes-dashboard -n kubernetes-dashboard --type='json' --patch='[{"op": "replace", "path": "/spec/ports/0/nodePort", "value":30082}]'

# now for shits and giggles, we'll make a namespace called gokuins
kubectl create ns gokuins
kubectl create -f gokuins.yaml -n gokuins
kubectl create -f gokuins-service.yaml -n gokuins
