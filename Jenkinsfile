pipeline {
    agent none
    environment {
        docker_user = "thescavenger126"
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
                    sh 'sed -i "s/DOCKER_USER/${docker_user}/g" webui.yml'
                    sh 'sed -i "s/DOCKER_APP/${docker_app}/g" webui.yml'
                    sh 'sed -i "s/BUILD_NUMBER/$BUILD_NUMBER/g" webui.yml'
                    sh 'scp -r -v -o StrictHostKeyChecking=no *.yml tylerp@clnodevm020-1.clemson.cloudlab.us:~/'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/webui.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@clnodevm020-1.clemson.cloudlab.us kubectl apply -f /users/tylerp/webui-service.yml -n jenkins' 
                }
            }
        }
    }
}
