pipeline {
    agent none
    environment {
        registry = "thescavenger126/go_server"
        docker_user = "thescavenger126"
        docker_app = "go_server"
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
                    sh 'docker build -t $DOCKER_REGISTRY:$BUILD_NUMBER .'
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
                    sh "sed -i 's/DOCKER_USER/${docker_user}/g' deployment.yml"
                    sh "sed -i 's/DOCKER_APP/${docker_app}/g' deployment.yml"
                    sh "sed -i 's/BUILD_NUMBER/${BUILD_NUMBER}/g' deployment.yml"
                    sh 'scp -r -v -o StrictHostKeyChecking=no *.yml tylerp@130.127.132.208:~/'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@130.127.132.208 kubectl apply -f /users/tylerp/deployment.yml -n jenkins'
                    sh 'ssh -o StrictHostKeyChecking=no tylerp@130.127.132.208 kubectl apply -f /users/tylerp/service.yml -n jenkins'                                        
                }
            }
        }
    }
}
