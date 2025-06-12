pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'playwright-tests'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], // or '*/master' depending on your default branch
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[
                        credentialsId: '', // Add your credentials ID if needed
                        url: 'https://github.com/rahul201022/Playwright_CICD.git' // Replace with your actual repository URL
                    ]]
                ])
            }
        }
        
        stage('Setup Docker') {
            steps {
                script {
                    // Check if Docker is available and running
                    sh '''
                        if command -v docker &> /dev/null; then
                            echo "Docker found, checking if it's running..."
                            if docker info &> /dev/null; then
                                echo "Docker is running"
                                docker --version
                                echo "Docker context: $(docker context ls | grep '*' | awk '{print $1}')"
                            else
                                echo "Docker is not running. Please start Colima with: colima start"
                                exit 1
                            fi
                        else
                            echo "Docker not found. Please install Docker CLI and Colima:"
                            echo "brew install docker colima"
                            echo "colima start"
                            exit 1
                        fi
                    '''
                }
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