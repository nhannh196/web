import React from 'react';

const QuestionIcon = ({colorchange}) =>{
    return(
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.1156 12.3117C19.1156 12.6545 19.0927 12.9973 19.047 13.3383C19.0576 13.2609 19.0681 13.1818 19.0787 13.1045C18.9873 13.7795 18.808 14.4404 18.5425 15.068C18.5724 14.9977 18.6023 14.9274 18.6304 14.8588C18.3738 15.4652 18.0398 16.0348 17.639 16.5568C17.6847 16.4971 17.7304 16.4391 17.7761 16.3793C17.3718 16.9031 16.9007 17.3725 16.3787 17.7768C16.4384 17.7311 16.4964 17.6854 16.5562 17.6397C16.0341 18.0404 15.4646 18.3744 14.8582 18.6311C14.9285 18.6012 14.9988 18.5713 15.0673 18.5432C14.4398 18.8068 13.7789 18.9879 13.1039 19.0793C13.1812 19.0688 13.2603 19.0582 13.3377 19.0477C12.6574 19.1373 11.9666 19.1373 11.2845 19.0477C11.3619 19.0582 11.441 19.0688 11.5183 19.0793C10.8433 18.9879 10.1824 18.8086 9.55484 18.5432C9.62516 18.5731 9.69547 18.6029 9.76402 18.6311C9.15758 18.3744 8.58805 18.0404 8.06598 17.6397C8.12574 17.6854 8.18375 17.7311 8.24351 17.7768C7.71969 17.3725 7.25035 16.9014 6.84605 16.3793C6.89176 16.4391 6.93746 16.4971 6.98316 16.5568C6.58238 16.0348 6.2484 15.4652 5.99176 14.8588C6.02164 14.9291 6.05152 14.9994 6.07965 15.068C5.81597 14.4404 5.63492 13.7795 5.54351 13.1045C5.55406 13.1818 5.56461 13.2609 5.57515 13.3383C5.48551 12.658 5.48551 11.9672 5.57515 11.2852C5.56461 11.3625 5.55406 11.4416 5.54351 11.519C5.63492 10.844 5.81422 10.183 6.07965 9.55547C6.04976 9.62579 6.01988 9.6961 5.99176 9.76465C6.2484 9.15821 6.58238 8.58868 6.98316 8.06661C6.93746 8.12637 6.89176 8.18438 6.84605 8.24415C7.25035 7.72032 7.72144 7.25098 8.24351 6.84669C8.18375 6.89239 8.12574 6.93809 8.06598 6.98379C8.58805 6.58301 9.15758 6.24903 9.76402 5.99239C9.69371 6.02227 9.6234 6.05215 9.55484 6.08028C10.1824 5.81661 10.8433 5.63555 11.5183 5.54415C11.441 5.55469 11.3619 5.56524 11.2845 5.57579C11.9648 5.48614 12.6556 5.48614 13.3377 5.57579C13.2603 5.56524 13.1812 5.55469 13.1039 5.54415C13.7789 5.63555 14.4398 5.81485 15.0673 6.08028C14.997 6.0504 14.9267 6.02051 14.8582 5.99239C15.4646 6.24903 16.0341 6.58301 16.5562 6.98379C16.4964 6.93809 16.4384 6.89239 16.3787 6.84669C16.9025 7.25098 17.3718 7.72208 17.7761 8.24415C17.7304 8.18438 17.6847 8.12637 17.639 8.06661C18.0398 8.58868 18.3738 9.15821 18.6304 9.76465C18.6005 9.69434 18.5707 9.62403 18.5425 9.55547C18.8062 10.183 18.9873 10.844 19.0787 11.519C19.0681 11.4416 19.0576 11.3625 19.047 11.2852C19.0927 11.6262 19.1156 11.969 19.1156 12.3117C19.1156 12.5367 19.214 12.774 19.3722 12.934C19.5252 13.0869 19.7748 13.2012 19.9945 13.1906C20.2212 13.1801 20.4568 13.1063 20.6168 12.934C20.775 12.7617 20.8752 12.5508 20.8734 12.3117C20.8716 11.4328 20.7398 10.5398 20.4673 9.70313C20.2037 8.89102 19.8257 8.10704 19.3283 7.41094C19.0646 7.04004 18.7781 6.68321 18.4617 6.35626C18.1435 6.02754 17.7972 5.73751 17.4334 5.45977C16.7548 4.93946 15.9972 4.54747 15.1974 4.25215C14.3748 3.94981 13.4941 3.79161 12.6205 3.75645C11.7345 3.72129 10.8275 3.83028 9.97496 4.07286C9.15758 4.30489 8.35953 4.66348 7.64937 5.13106C6.94625 5.59336 6.29762 6.15411 5.76148 6.80274C5.46969 7.15782 5.19371 7.52872 4.95816 7.92247C4.72086 8.31797 4.52926 8.73458 4.35347 9.16172C4.02125 9.97208 3.84019 10.8352 3.7734 11.707C3.70484 12.5912 3.78922 13.4982 3.99664 14.3596C4.19879 15.191 4.53629 16.0049 4.98101 16.7361C5.41695 17.4533 5.96363 18.1213 6.59117 18.6785C7.22398 19.2393 7.93238 19.7227 8.70406 20.0707C9.12594 20.2623 9.56012 20.4311 10.0066 20.5559C10.4636 20.6842 10.9312 20.7615 11.4023 20.816C12.2935 20.9215 13.2005 20.8617 14.0777 20.6842C14.9162 20.5137 15.7371 20.199 16.4841 19.7824C17.2171 19.3729 17.9009 18.8455 18.481 18.2373C19.0664 17.6256 19.5726 16.9225 19.9488 16.1649C20.3337 15.3914 20.6168 14.5652 20.7468 13.7109C20.8171 13.2451 20.8664 12.7793 20.8664 12.3082C20.8664 12.0832 20.7679 11.8459 20.6097 11.6859C20.4568 11.533 20.2072 11.4188 19.9875 11.4293C19.7607 11.4398 19.5252 11.5137 19.3652 11.6859C19.2158 11.8617 19.1156 12.0727 19.1156 12.3117Z" fill={colorchange}/>
                <path d="M12.3125 17.7328C12.5375 17.7328 12.7748 17.6344 12.9348 17.4762C13.0877 17.3233 13.202 17.0737 13.1914 16.8539C13.1809 16.6272 13.107 16.3916 12.9348 16.2317C12.7625 16.0735 12.5516 15.975 12.3125 15.975C12.0875 15.975 11.8502 16.0735 11.6902 16.2317C11.5373 16.3846 11.4231 16.6342 11.4336 16.8539C11.4442 17.0807 11.518 17.3162 11.6902 17.4762C11.8625 17.6344 12.0752 17.7328 12.3125 17.7328ZM10.6074 10.3518C10.6074 10.2375 10.6145 10.125 10.6303 10.0108C10.6197 10.0881 10.6092 10.1672 10.5986 10.2446C10.6303 10.0178 10.6901 9.79632 10.7779 9.58538C10.7481 9.65569 10.7182 9.726 10.6901 9.79456C10.7779 9.58889 10.8904 9.39554 11.0258 9.218C10.9801 9.27776 10.9344 9.33577 10.8887 9.39554C11.0258 9.21975 11.1822 9.06331 11.358 8.9262C11.2983 8.9719 11.2402 9.01761 11.1805 9.06331C11.358 8.92796 11.5514 8.81546 11.757 8.72757C11.6867 8.75745 11.6164 8.78733 11.5479 8.81546C11.7588 8.72757 11.9803 8.6678 12.207 8.63616C12.1297 8.64671 12.0506 8.65725 11.9733 8.6678C12.2 8.63968 12.4285 8.63968 12.6553 8.6678C12.5779 8.65725 12.4988 8.64671 12.4215 8.63616C12.6483 8.6678 12.8697 8.72581 13.0824 8.8137C13.0121 8.78382 12.9418 8.75393 12.8733 8.72581C13.0789 8.8137 13.2723 8.9262 13.4498 9.06155C13.39 9.01585 13.332 8.97014 13.2723 8.92444C13.4481 9.06155 13.6045 9.218 13.7416 9.39378C13.6959 9.33401 13.6502 9.276 13.6045 9.21624C13.7399 9.39378 13.8523 9.58714 13.9402 9.7928C13.9104 9.72249 13.8805 9.65218 13.8523 9.58362C13.9402 9.79632 14 10.016 14.0299 10.2446C14.0193 10.1672 14.0088 10.0881 13.9982 10.0108C14.0264 10.2375 14.0264 10.466 13.9982 10.691C14.0088 10.6137 14.0193 10.5346 14.0299 10.4573C13.9982 10.684 13.9385 10.9055 13.8506 11.1182C13.8805 11.0479 13.9104 10.9776 13.9385 10.909C13.8506 11.1147 13.7381 11.308 13.601 11.4873C13.6467 11.4276 13.6924 11.3696 13.7381 11.3098C13.601 11.4856 13.4445 11.642 13.2688 11.7791C13.3285 11.7334 13.3865 11.6877 13.4463 11.642C13.2705 11.7756 13.0807 11.8846 12.8803 11.9742C12.6236 12.0885 12.3828 12.2678 12.1842 12.4647C11.7236 12.9235 11.467 13.5405 11.4371 14.1873C11.4319 14.3157 11.4354 14.444 11.4354 14.5723C11.4354 14.7973 11.5338 15.0346 11.692 15.1946C11.8449 15.3475 12.0945 15.4617 12.3143 15.4512C12.541 15.4407 12.7766 15.3668 12.9365 15.1946C13.0947 15.0223 13.1932 14.8114 13.1932 14.5723C13.1932 14.393 13.1861 14.2137 13.209 14.0362C13.1984 14.1135 13.1879 14.1926 13.1774 14.27C13.1984 14.1293 13.2354 13.994 13.2899 13.8621C13.26 13.9325 13.2301 14.0028 13.202 14.0713C13.26 13.9342 13.3356 13.8076 13.427 13.6881C13.3813 13.7479 13.3356 13.8059 13.2899 13.8657C13.3777 13.7549 13.4779 13.6565 13.5887 13.5686C13.5289 13.6143 13.4709 13.66 13.4111 13.7057C13.5816 13.5756 13.7732 13.5 13.9613 13.4016C14.1951 13.2785 14.4096 13.1168 14.61 12.9463C14.9633 12.6457 15.2621 12.2467 15.4484 11.8213C15.5574 11.5717 15.6559 11.3239 15.7051 11.0549C15.7543 10.7842 15.7895 10.5065 15.7754 10.2305C15.7508 9.69612 15.6154 9.19339 15.3693 8.72054C14.9316 7.8803 14.1055 7.23694 13.1914 7.00139C12.6623 6.86604 12.1297 6.86429 11.5953 6.96624C11.3404 7.0137 11.1067 7.10862 10.8676 7.21057C10.6901 7.28616 10.5213 7.37932 10.3649 7.49182C9.91838 7.81175 9.5299 8.20901 9.26975 8.69944C8.99905 9.20921 8.85139 9.77347 8.84963 10.3535C8.84787 10.5785 8.94807 10.8158 9.10627 10.9758C9.2592 11.1287 9.50881 11.243 9.72854 11.2325C10.2067 11.2096 10.6057 10.8457 10.6074 10.3518Z" fill={colorchange}/>
            </svg>
        </>
    )
}
export default QuestionIcon;