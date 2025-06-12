pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'playwright-tests'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                script {
                    try {
                        sh 'docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npx playwright test --reporter=html'
                    } catch (Exception e) {
                        echo "Tests failed: ${e.getMessage()}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
            post {
                always {
                    script {
                        // Copy test results from container
                        sh '''
                            docker create --name temp-container ${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker cp temp-container:/app/playwright-report ./playwright-report || true
                            docker rm temp-container
                        '''
                    }
                }
            }
        }
        
        stage('Publish Test Results') {
            steps {
                script {
                    // Publish HTML report
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                script {
                    sh 'docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        unstable {
            echo 'Pipeline completed with unstable results!'
        }
    }
} 