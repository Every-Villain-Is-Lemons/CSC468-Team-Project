pipeline {
    agent none
    environment {
        registry = "thescavenger126/gokoins-worker"
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
                    sh 'scp -r -v -o StrictHostKeyChecking=no *.yml tylerp@10.106.180.200:~/'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@10.106.180.200 kubectl apply -f /users/tylerp/ramcoin.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@10.106.180.200 kubectl apply -f /users/tylerp/ramcoin-service.yml -n jenkins'
                }
            }
        }
    }
}
