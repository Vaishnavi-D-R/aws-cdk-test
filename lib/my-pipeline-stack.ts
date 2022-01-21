import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

export class MyPipelineStack extends cdk.Stack {
	  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		      super(scope, id, props);

		          const pipeline = new CodePipeline(this, 'Pipeline', {
				        pipelineName: 'MyPipeline',
					      synth: new ShellStep('Synth', {
						              input: CodePipelineSource.gitHub('Vaishnavi-D-R/aws-cdk-test', 'main'),
							              commands: ['npm ci', 'npm run build', 'npx cdk synth']
								            })
									        });
										pipeline.addStage(new MyPipelineAppStage(this, "test", {
											      env: { account: "294649033237", region: "us-east-2" }
											          }));
												  const testingStage = pipeline.addStage(new MyPipelineAppStage(this, 'testing', {
													    env: { account: '294649033237', region: 'us-east-2' }
												  }));

												      testingStage.addPost(new ManualApprovalStep('approval'));
												      // stage was returned by pipeline.addStage

												      stage.addPost(new ShellStep("validate", {
													        commands: ['curl -Ssf https://my.webservice.com/'],
												      }));
												      // given a stack lbStack that exposes a load balancer construct as loadBalancer
												      this.loadBalancerAddress = new cdk.CfnOutput(lbStack, 'LbAddress', {
													        value: `https://${lbStack.loadBalancer.loadBalancerDnsName}/`
												      });

														// pass the load balancer address to a shell step
														stage.addPost(new ShellStep("lbaddr", {
															  envFromCfnOutputs: {lb_addr: lbStack.loadBalancerAddress},
															    commands: ['echo $lb_addr']
														}));
										  }
}
