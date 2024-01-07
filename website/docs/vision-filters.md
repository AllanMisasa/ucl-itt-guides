---
title: Filtre, thresholds og morfologiske operationer i OpenCV
---

## Trackbars til at justere parametre og teste forskellige thresholdværdier

Vi kan bruge trackbars til at justere parametre og teste forskellige thresholdværdier live. Se følgende eksempel:

```cpp
string path = "images/"; 		

int low = 0;
int high = 255;
const String window = "Binary thresholds";

static void onTrackbar(int, void *) {
	low_H = min(high-1, low);
	setTrackbarPos("Low", window, low_H);
}

int main() {
	string image_path = samples::findFile("starry_night.jpg");  		// Set path to image
	string italy = path + "italy.jpg";									// Set path to image
	Mat threshold;
	Mat img1 = imread(italy, 0);  										// Read image into Mat object
	Mat img2 = imread(image_path, 0);  									// Read image into Mat object

	namedWindow(window, WINDOW_AUTOSIZE); 								// Create a window
	createTrackbar("Low", window, &low , 255, onTrackbar); 				// Create a trackbar

	while (true) {	
		inRange(img1, low_H, high_H, threshold);
		imshow("Lena", threshold); 										// Show the image
		char key = (char) waitKey(30);
		if (key == 'q' || key == 27)
		{
			break;
		}			
	}								
}
```

Vi kan også gøre det med farvebilledeværdier, hvor vi kan teste hvis vi kigger i bestemte ranges af farver, f.eks. til at isolere objekter der har en bestemt farve:

Viser det fulde program fordi det giver et bedre perspektiv, og det anbefales også at køre dette program isoleret.

```cpp
#include "opencv2/imgproc.hpp"
#include "opencv2/highgui.hpp"

using namespace cv;
using namespace std;

const int max_value_H = 360/2;
const int max_value = 255;
const String window_capture_name = "Video Capture";
const String window_detection_name = "Object Detection";
int low_H = 0, low_S = 0, low_V = 0;
int high_H = max_value_H, high_S = max_value, high_V = max_value;
static void on_low_H_thresh_trackbar(int, void *)
{
	low_H = min(high_H-1, low_H);
	setTrackbarPos("Low H", window_detection_name, low_H);
}
static void on_high_H_thresh_trackbar(int, void *)
{
	high_H = max(high_H, low_H+1);
	setTrackbarPos("High H", window_detection_name, high_H);
}
static void on_low_S_thresh_trackbar(int, void *)
{
	low_S = min(high_S-1, low_S);
	setTrackbarPos("Low S", window_detection_name, low_S);
}
static void on_high_S_thresh_trackbar(int, void *)
{
	high_S = max(high_S, low_S+1);
	setTrackbarPos("High S", window_detection_name, high_S);
}
static void on_low_V_thresh_trackbar(int, void *)
{
	low_V = min(high_V-1, low_V);
	setTrackbarPos("Low V", window_detection_name, low_V);
}
static void on_high_V_thresh_trackbar(int, void *)
{
	high_V = max(high_V, low_V+1);
	setTrackbarPos("High V", window_detection_name, high_V);
}

void HSV_track_bars(Mat img) {
	Mat img_HSV, frame_threshold;						// Create Mat objects for HSV image and thresholded image

    namedWindow(window_capture_name);
    namedWindow(window_detection_name);
	
    createTrackbar("Low H", window_detection_name, &low_H, max_value_H, on_low_H_thresh_trackbar);
    createTrackbar("High H", window_detection_name, &high_H, max_value_H, on_high_H_thresh_trackbar);
    createTrackbar("Low S", window_detection_name, &low_S, max_value, on_low_S_thresh_trackbar);
    createTrackbar("High S", window_detection_name, &high_S, max_value, on_high_S_thresh_trackbar);
    createTrackbar("Low V", window_detection_name, &low_V, max_value, on_low_V_thresh_trackbar);
    createTrackbar("High V", window_detection_name, &high_V, max_value, on_high_V_thresh_trackbar);

	while (true) {
		cvtColor(img, img_HSV, COLOR_BGR2HSV);
		inRange(img_HSV, Scalar(low_H, low_S, low_V), Scalar(high_H, high_S, high_V), frame_threshold);

		imshow(window_capture_name, img);
		imshow(window_detection_name, frame_threshold);
		char key = (char) waitKey(30);
		if (key == 'q' || key == 27)
		{
			break;
		}
	}
}

int main(int argc, char* argv[])
{
    Mat img = imread("C:/images/lena.jpg"); 
    return 0;
}
```

## Farvefiltre

Ovenstående eksempel kan bruges til at finde de rigtige værdier til et farvefilter. Efter vi har fundet det, kan vi gemme værdierne i en variabel, og bruge dem til at lave et farvefilter, som er det vi skal se på nu.

Lad os starte med hvordan vi kan lave et farvefilter. Vi starter med at konvertere billedet til HSV, da det er nemmere at arbejde med farver i HSV end i RGB. Derefter laver vi et threshold på farven, ved at lave 2 skalarer med 3 værdier hver - nedre og øvre grænse på farverne, og til sidst bruger vi `bitwise_and` til at lave et binært billede. Se følgende eksempel:

```cpp
Mat image = imread("C:/images/lena.jpg");   						// Read the file from disk
Mat hsvImage; 														// Create a new empty image
cvtColor(image, hsvImage, COLOR_BGR2HSV); 							// Convert to HSV
Mat mask; 															// Create a new empty image
inRange(hsvImage, Scalar(0, 100, 100), Scalar(10, 255, 255), mask); // Apply threshold - first scalar is lower bound, second scalar is upper bound
Mat result; 														// Create a new empty image
bitwise_and(image, image, result, mask); 							// Apply mask
imshow("Lena", result); 											// Show the image
waitKey(0); 														// Wait for keypress
```

## Thresholding

Vi bruger først binær thresholding som er den mest simple måde at lave thresholding. Det den gør, er at tage ethvert pixel i billedet, og hvis det er over en bestemt værdi, så sætter den det til 255, ellers sætter den det til 0. Se følgende eksempel:

```cpp
Mat binary_threshold(Mat src) {
    Mat dst;
    int thresh = 100;
    int maxValue = 255;
    threshold(src, dst, thresh, maxValue, THRESH_BINARY);
    return dst;
}
```

Vi kan bruge noget kaldet Otsu's metode til at lave et threshold på et billede. Det er en metode der automatisk finder den bedste threshold-værdi. Så husk at tjekke threshold værdien når du kører den (eksemplet printer det i terminalen) Se følgende eksempel:

```cpp
Mat OtsuThreshold(Mat src) {
    Mat dst;
    int thresh = 0;
    int maxValue = 255;
    long double thres = threshold(src, dst, thresh, maxValue, THRESH_OTSU); // thres is the approximated threshold for Otsu
    cout << "Otsu threshold: " << thres << endl;                            // print approximated threshold
    return dst;
}
```

## Gaussian blur

Gaussian blur er en af de mest brugte filtre i billedbehandling. Det bruges til at fjerne støj fra et billede, og det kan også bruges til at udglatte et billede. Det er et såkaldt lineært filter, hvilket betyder at det er et filter der kan beskrives ved en matematisk ligning. 

I C++ bruger vi funktionen `GaussianBlur` til at lave et Gaussian blur på et billede. Den tager et billede som input, samt størrelsen på kernelen og standardafvigelsen. Se følgende eksempel:

```cpp
Mat image = imread("C:/images/lena.jpg"); 				// Read the file from disk
Mat blurredImage; 										// Create a new empty image
GaussianBlur(image, blurredImage, Size(5, 5), 1.5); 	// Apply Gaussian blur - kernel size is 5x5 and standard deviation is 1.5. Higher values result in more blur
imshow("Lena", blurredImage); 							// Show the image
waitKey(0); 											// Wait for keypress
imwrite("C:/images/lena_blurred.jpg", blurredImage); 	// Write the image to disk
```

## Bilateralfilter

Bilateral filter er bedre end Gaussian blur når der er støj i billedet. Det er også et lineært filter, og det bruger 2 standardafvigelser - en for rummet og en for intensiteten. Se følgende eksempel:

```cpp
Mat filteredImage; 									// Create a new empty image
bilateralFilter(image, filteredImage, 5, 60, 0.4); 	// Apply bilateral filter - kernel size is 5x5, sigmaColor is the standard deviation for the intensity and sigmaSpace is the standard deviation for the space
imshow("Lena", filteredImage); 						// Show the image
waitKey(0); 										// Wait for keypress
```

## Edgepreserving filter

Edgepreserving filter er et filter der bruges til at bevare kanter i et billede. Det er et ikke-lineært filter, og det bruger 2 standardafvigelser - en for rummet og en for intensiteten. Se følgende eksempel:

```cpp
Mat filteredImage; 													// Create a new empty image
edgePreservingFilter(image, filteredImage, 1, 60, 0.4); 			// Apply edge preserving filter - last 2 values: sigma_s is the standard deviation for the space and sigma_r is the standard deviation for the intensity
imshow("After edgepreserving filter is applied", filteredImage); 	// Show the image
waitKey(0); 														// Wait for keypress
```

## Morfologiske operationer

Morfologiske operationer er operationer der bruges til at ændre formen af et objekt. De bruges ofte til at fjerne støj fra et billede, og til at udvide eller formindske objekter. De bruges også til at fjerne huller i objekter.

Vi bruger erosion til at formindske kanter i billedet. Vi bruger funktionen `erode` til at lave erosion. Den tager et billede som input, samt en kernel. Se følgende eksempel:

```cpp
Mat erodedImage; 							// Create a new empty image
Mat kernel = Mat::ones(5, 5, CV_32F); 		// Create a 5x5 kernel with all elements equal to 1
erode(image, erodedImage, kernel); 			// Apply erosion
imshow("Eroded image", erodedImage); 				// Show the image
waitKey(0); 								// Wait for keypress
```

Vi bruger derefter dilation til at udvide objekter, f.eks. kanter, i et billede. Vi bruger funktionen `dilate` til at lave dilation. Den tager et billede som input, samt en kernel. Se følgende eksempel:

```cpp
Mat dilatedImage; 							// Create a new empty image
Mat kernel = Mat::ones(5, 5, CV_32F); 		// Create a 5x5 kernel with all elements equal to 1
dilate(image, dilatedImage, kernel); 		// Apply dilation
imshow("Dilated image", dilatedImage); 				// Show the image
waitKey(0); 								// Wait for keypress
```

Vi kan bruge open til at lave både erosion og dilation sammen, hvilket kan hjælpe med at finde færdige kanter. Vi bruger funktionen `morphologyEx` til at lave opening. Den tager et billede som input, samt en kernel. Se følgende eksempel:

```cpp
Mat openedImage; 							// Create a new empty image
Mat kernel = Mat::ones(5, 5, CV_32F); 		// Create a 5x5 kernel with all elements equal to 1
morphologyEx(image, openedImage, MORPH_OPEN, kernel); // Apply opening
imshow("Opened image", openedImage); 				// Show the image
waitKey(0); 								// Wait for keypress
```
