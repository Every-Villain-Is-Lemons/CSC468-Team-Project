pipeline {
    agent none
    environment {
        registry = "thescavenger126/ramcoin"
        docker_user = "thescavenger126"
        GOCACHE = "/tmp"
    }
    stages {
        stage('Publish') {
            agent {
                kubernetes {
                    inheritFrom 'agent-template'
                }
            }
            steps{
                container('docker') {
                    sh 'echo $DOCKER_TOKEN | docker login --username $DOCKER_USER --password-stdin'
                }
            }
        }
        stage ('Deploy') {
            agent {
                node {
                    label 'deploy'
                }
            }
            steps {
                sshagent(credentials: ['cloudlab']) {
                    sh 'docker-compose -f docker-compose.images.yml build'
                    sh 'docker-compose -f docker-compose.images.yml push'
                    sh 'kubectl create deployment redis --image=redis'
                    sh 'kubectl create deployment worker --image=127.0.0.2:30000/worker:v0.1'
                    sh 'kubectl expose deployment redis --port 6379'
                    sh 'kubectl apply -f dashboard-insecure.yaml'
                    sh 'kubectl apply -f socat.yaml'
                    sh 'kubectl get namespace'
                    sh 'kubectl get svc --namespace=kubernetes-dashboard'
                    sh "kubectl patch service kubernetes-dashboard -n kubernetes-dashboard --type='json' --patch='[{\"op\": \"replace\", \"path\": \"/spec/ports/0/nodePort\", \"value\":30082}]'"
                }
            }
        }
    }
}
