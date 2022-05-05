pipeline {
    agent none
    environment {
        docker_app = "gokoins-webui"
        GOCACHE = "/tmp"
    }
    stages {
        stage('Publish') {
            agent {
                kubernetes {
                    inheritFrom 'gokoins-webui'
                }
            }
            steps{
                container('docker') {
                    sh 'echo $DOCKER_TOKEN | docker login --username $DOCKER_USER --password-stdin'
                    sh 'docker build -t $DOCKER_REGISTRY:$BUILD_NUMBER -f webui/Dockerfile .'
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
                    sh 'scp -r -v -o StrictHostKeyChecking=no *.yml tylerp@clnodevm020-1.clemson.cloudlab.us:~/'
                    sh 'sed -i "s/DOCKER_USER/$DOCKER_USER/g" ramcoin.yml'
                    sh 'sed -i "s/DOCKER_APP/${docker_app}/g" ramcoin.yml'
                    sh 'sed -i "s/BUILD_NUMBER/$BUILD_NUMBER/g" ramcoin.yml'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/ramcoin.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/ramcoin-service.yml -n jenkins' 
                    
                    // MANUAL: kubectl patch svc webui --type='json' --patch='[{"op": "replace", "path": "/spec/ports/0/nodePort", "value":30080}]' -n jenkins
                }
            }
        }
    }
}
