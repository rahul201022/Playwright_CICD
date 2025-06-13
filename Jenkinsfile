pipeline {
    agent any
    
    // Enable automatic builds on Git changes
    triggers {
        pollSCM('H/5 * * * *')  // Poll every 5 minutes as fallback
    }
    
    environment {
        DOCKER_IMAGE = 'playwright-tests'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${env.PATH}"
        DOCKER_HOST = "unix:///Users/rahulm/.colima/default/docker.sock"
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
        
        // Uncomment the next stage to test email notifications
        // stage('Test Email Failure') {
        //     steps {
        //         script {
        //             echo "This stage is intentionally failing to test email notifications"
        //             error "Forced failure to test email notification system"
        //         }
        //     }
        // }
        
        stage('Setup Docker') {
            steps {
                script {
                    // Check if Docker is available and running
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                        
                        if [ -f "/opt/homebrew/bin/docker" ]; then
                            echo "Docker found at /opt/homebrew/bin/docker"
                            /opt/homebrew/bin/docker --version
                            
                            if /opt/homebrew/bin/docker info &> /dev/null; then
                                echo "Docker is running"
                                /opt/homebrew/bin/docker context ls
                            else
                                echo "Docker is not running. Attempting to start Colima..."
                                
                                # Check if colima is available
                                if command -v colima &> /dev/null; then
                                    echo "Starting Colima..."
                                    colima start
                                    
                                    # Wait a moment for Docker to be ready
                                    sleep 5
                                    
                                    # Check if Docker is now running
                                    if /opt/homebrew/bin/docker info &> /dev/null; then
                                        echo "Docker is now running after starting Colima"
                                        /opt/homebrew/bin/docker context ls
                                    else
                                        echo "Failed to start Docker with Colima"
                                        echo "Please manually start Colima with: colima start"
                                        exit 1
                                    fi
                                else
                                    echo "Colima not found. Please install it with: brew install colima"
                                    echo "Then start it with: colima start"
                                    exit 1
                                fi
                            fi
                        else
                            echo "Docker not found at /opt/homebrew/bin/docker"
                            echo "Please install Docker CLI and Colima:"
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
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                        /opt/homebrew/bin/docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    '''
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                script {
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                        /opt/homebrew/bin/docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npx playwright test --reporter=html
                    '''
                }
            }
            post {
                always {
                    script {
                        // Copy test results from container
                        sh '''
                            export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                            /opt/homebrew/bin/docker create --name temp-container ${DOCKER_IMAGE}:${DOCKER_TAG}
                            /opt/homebrew/bin/docker cp temp-container:/app/playwright-report ./playwright-report || true
                            /opt/homebrew/bin/docker rm temp-container
                        '''
                    }
                }
                failure {
                    script {
                        echo "Tests failed - setting build status to FAILURE"
                        currentBuild.result = 'FAILURE'
                    }
                }
                success {
                    script {
                        echo "Tests passed successfully"
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
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
                        /opt/homebrew/bin/docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
            script {
                echo "Build completed with status: ${currentBuild.result}"
                echo "Build URL: ${env.BUILD_URL}"
                echo "Job Name: ${env.JOB_NAME}"
                echo "Build Number: ${env.BUILD_NUMBER}"
            }
        }
        success {
            echo 'Pipeline completed successfully!'
            emailext (
                subject: "✅ Build Success: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                <h2>Build Success!</h2>
                <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                <p><strong>Build Log:</strong> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
                <p><strong>Test Report:</strong> <a href="${env.BUILD_URL}HTML_Report/">HTML Test Report</a></p>
                <p><strong>Status:</strong> ✅ SUCCESS</p>
                """,
                to: 'rahulm@york.ie',
                mimeType: 'text/html'
            )
        }
        failure {
            echo 'Pipeline failed!'
            script {
                echo "Sending failure email notification..."
            }
            emailext (
                subject: "❌ Build Failed: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                <h2>Build Failed!</h2>
                <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                <p><strong>Build Log:</strong> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
                <p><strong>Status:</strong> ❌ FAILURE</p>
                <p><strong>Please check the build log for details.</strong></p>
                """,
                to: 'rahulm@york.ie',
                mimeType: 'text/html'
            )
        }
        unstable {
            echo 'Pipeline completed with unstable results!'
            script {
                echo "Sending unstable email notification..."
            }
            emailext (
                subject: "⚠️ Build Unstable: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                body: """
                <h2>Build Unstable!</h2>
                <p><strong>Project:</strong> ${env.JOB_NAME}</p>
                <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                <p><strong>Build Log:</strong> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
                <p><strong>Status:</strong> ⚠️ UNSTABLE</p>
                <p><strong>Some tests may have failed. Please check the build log.</strong></p>
                """,
                to: 'rahulm@york.ie',
                mimeType: 'text/html'
            )
        }
    }
} 