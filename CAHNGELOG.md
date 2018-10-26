configurations.all {
    resolutionStrategy {
        force 'com.android.support:support-v4:27.1.0'
    }
}


#import "UMMobClick/MobClick.h"
    UMConfigInstance.appKey = @"5ad433d7b27b0a5b0c00007e";  
    UMConfigInstance.channelId = @"App Store"; 
    [MobClick startWithConfigure:UMConfigInstance];  