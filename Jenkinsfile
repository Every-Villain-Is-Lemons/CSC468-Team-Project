pipeline {
    agent none
    environment {
        registry = "thescavenger126/gokoins-worker"
        docker_user = "thescavenger126"
        docker_app = "gokoins-worker"
        GOCACHE = "/tmp"
    }
    stages {
        stage('Publish') {
            agent {
                kubernetes {
                    inheritFrom 'gokoins-worker'
                }
            }
            steps{
                container('docker') {
                    sh 'echo $DOCKER_TOKEN | docker login --username $DOCKER_USER --password-stdin'
                    sh 'docker build -t $DOCKER_REGISTRY:$BUILD_NUMBER -f worker/Dockerfile .'
                    sh 'docker push $DOCKER_REGISTRY:$BUILD_NUMBER'
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
                    sh 'sed -i "s/DOCKER_USER/${docker_user}/g" worker.yml'
                    sh 'sed -i "s/DOCKER_APP/${docker_app}/g" worker.yml'
                    sh 'sed -i "s/BUILD_NUMBER/$BUILD_NUMBER/g" worker.yml'
                    sh 'scp -r -v -o StrictHostKeyChecking=no *.yml tylerp@clnodevm020-1.clemson.cloudlab.us:~/'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/worker.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/redis-service.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f dashboard-insecure.yml'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f socat.yml'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl get svc -n kubernetes-dashboard'
                }
            }
        }
    }
}
