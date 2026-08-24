---
title: Tello Activation
date: 2026-08-24
tags:
  - pixel
  - postmarketos
categories:
  - organizational-tools
---
## Context
A true test of a mobile device for me is whether I can make a phone call.

T-Mobile is the friendliest network for Linux, since it doesn't allowlist IMEI numbers, but T-Mobile doesn't have a pay as you go option suitable for a test device.

Tello, however, is a T-Mobile MVNO and does provide a pay as you go option, so I created a plan that just has voice and sms.

This post details the configuration I applied on the device to activate Tello.
## Tello Activation Code
I can find my activation code in the Tello dashboard under My SIM > Manual Install > Google Pixel. It looks like this: `LPA:1$t-mobile.idemia.io$A1B234C567D890E123F456G789H`.
## lpa-gtk
I started with the [lpa-gtk Gnome app](https://codeberg.org/lucaweiss/lpa-gtk):
```sh
sudo apk add lpa-gtk
```

It had a couple rough edges, though:
1. I needed to enter the activation code manually, which is tedious and error prone, especially on a phone
2. it appeared to successfully download the eSIM, but then failed to show it in the list of profiles, and now fails to launch, so it was unclear what state I was in

**Note:** after all the debugging described below, I restarted the phone and then everyting worked, so it's possible lpa-gtk did activate the device and the only secondary step required was to restart. Apparently, the source of truth is being able to successfully send an SMS, and seeing an elided ICC ID in the My SIM section of the Tello Dashboard rather than an activation code.
## lpac
The author described in a [blog post](https://lucaweiss.eu/post/2024-06-24-esim-manager-for-mobile-linux) how it uses a tool called `lpac` under the hood, so I tried using that to debug. The Pixel 3a uses something called QRTR to communicate with its Qualcomm modem, so I need an `LPAC_APDU` env var:

```sh
$ LPAC_APDU=qmi_qrtr lpac chip info
{"type":"lpa","payload":{"code":0,"message":"success","data":{"eidValue":"1234567890","EuiccConfiguredAddresses":{"defaultDpAddress":"cust-007-v4-prod-atl2.gdsb.net","rootDsAddress":"https://subman1.gi-de.com/sr/rest"},"EUICCInfo2":{"profileVersion":"2.0.0","svn":"2.0.0","euiccFirmwareVer":"1.3.0","extCardResource":{"installedApplication":0,"freeNonVolatileMemory":1100280,"freeVolatileMemory":21580},"uiccCapability":["usimSupport","isimSupport","csimSupport","akaMilenage","akaCave","akaTuak128","akaTuak256","gbaAuthenISim","eapClient","javacard","multipleUsimSupport","multipleIsimSupport"],"ts102241Version":"9.2.0","globalplatformVersion":"2.2.1","rspCapability":["additionalProfile","testProfileSupport"],"euiccCiPKIdListForVerification":["1234567890","1234567890"],"euiccCiPKIdListForSigning":["1234567890","1234567890"],"euiccCategory":null,"forbiddenProfilePolicyRules":["pprUpdateControl","ppr1"],"ppVersion":"0.0.1","sasAcreditationNumber":"G&DAccreditationNbr","certificationDataObject":{"platformLabel":"1.2.840.1234567/myPlatformLabel","discoveryBaseURL":"https://mycompany.com/myDLOARegistrar"}},"rulesAuthorisationTable":[{"pprIds":["pprUpdateControl","ppr1","ppr2","ppr3"],"allowedOperators":[{"plmn":"eeeeee","gid1":null,"gid2":null}],"pprFlags":["consentRequired"]}]}}}
```

So my EUICC has data, though I'm unsure how to interpret it. `lpac` has a couple other methods, like `profile list`

```sh
$ LPAC_APDU=qmi_qrtr lpac profile list
{"type":"lpa","payload":{"code":0,"message":"success","data":[{"iccid":"1234567890","isdpAid":"1234567890","profileState":"enabled","profileNickname":"Anritsu","serviceProviderName":"Anritsu","profileName":"Anritsu Test Profile","iconType":null,"icon":null,"profileClass":"test"},{"iccid":"1234567890","isdpAid":"1234567890","profileState":"disabled","profileNickname":null,"serviceProviderName":"Tello","profileName":"Tello","iconType":null,"icon":null,"profileClass":null}]}}
```

I generalized the `iccid`, in case it's sensitive. Note the `profileName` is "Anritsu Test Profile", which seems odd. 

I can view notifications:
```sh
$ LPAC_APDU=qmi_qrtr lpac notification list                                                                                    
{"type":"lpa","payload":{"code":0,"message":"success","data":[{"seqNumber":3,"profileManagementOperation":"install","notificationAddress":"t-mobile.idemia.io","iccid":"0987654321"},{"seqNumber":2,"profileManagementOperation":"install","notificationAddress":"t-mobile.idemia.io","iccid":"0987654321"},{"seqNumber":1,"profileManagementO
peration":"install","notificationAddress":"t-mobile.idemia.io","iccid":"0987654321"}]}}
```

Note the `notificationAddress` is `t-mobile.idemia.io`, which is in my activation code. I generalized the `iccid` here too, but an important detail is that it matches the one in the Tello dashboard and differs from the one in the profile output.

If I need to enable it:

```sh
$ LPAC_APDU=qmi_qrtr lpac profile enable 0987654321
```
## mmcli
As I understand it, `mmcli` is the CLI for ModemManager, which manages the modem on systemd.

Verify the modem is active:
```sh
 $ mmcli -L
    /org/freedesktop/ModemManager1/Modem/0 [QUALCOMM INCORPORATED] 0 
    
pixel3a:~$ mmcli -m 0                                                            ...                                                                                                                                             
  Status   |             state: failed  
           |     failed reason: sim-missing            
           |       power state: off
...
  SIM      |    sim slot paths: slot 1: none (active)    
           |                    slot 2: /org/freedesktop/ModemManager1/SIM/0
```

Notice the populated SIM isn't the active one. Set the active SIM:
```sh
$ mmcli -m 0 --set-primary-sim-slot=2
```

Once the modem comes back up, notice the status (and index) has changed:
```sh
$ mmcli -L
    /org/freedesktop/ModemManager1/Modem/1 [QUALCOMM INCORPORATED] 0
    
$ mmcli -m 1
  Status   |                   lock: sim-pin2 
           |         unlock retries: sim-pin (3), sim-puk (10), sim-pin2 (10), sim-puk2 (10)   
           |                  state: disabled
           |            power state: off
```

Resuming work the next day, the phone is now in communication with a cell tower! The carrier is only identified by a number: 310190. That appears to be a Mobile Country Code (MCC) and Mobile Network Code (MNC). 310 is for the United States. 190 is for T-Mobile.

[Tello's APN page](https://tello.com/help_center/service-issues-troubleshooting/what-apn-settings-are-needed-with-tello) says I should be using MNC 240, but the command to connect just times out:
```sh
$ sudo mmcli -m 1 --3gpp-register-in-operator=310240
error: couldn't register the modem: 'Timeout was reached'
```

After fiddling with this a bit more, I tried rebooting the phone, at which point, it connected to Tello and I could send an SMS! 

I also saw that the My SIM section of the Tello dashboard now shows the elided ICC ID rather than the activation steps and code, an other confirmation of a state change.

Note there's an exclamation point in an orange box over the bars indicating cell signal strength, but this apparently refers to mobile date. I don't have data enabled for this plan, so the exclamation point is expected.
## Google Summary
For what it's worth, Google says the Tello activation string uses the standard GSMA format (`LPA:1$SMDP_SERVER_DOMAIN$CONFIRMATION_OR_ACTIVATION_CODE`) and these are the minimal steps required to activate using the `mmcli` and `lpac` tools:
```sh
# List modems and note modem index number
mmcli -L
    /org/freedesktop/ModemManager1/Modem/0 [QUALCOMM INCORPORATED] 0

# Set primary SIM to the secondary (eSIM) slot
sudo mmcli -m 0 --set-primary-sim-slot=2

# Verify SIM slot
mmcli -m 0 
...
  SIM      |                    primary sim path: /org/freedesktop/ModemManager1/SIM/0
           |                      sim slot paths: slot 1: none
           |                                      slot 2: /org/freedesktop/ModemManager1/SIM/0 (active)


# Turn off ModemManager to free the APDU channel for lpac
sudo systemctl stop ModemManager

# Download the Tello profile from the server to the eUICC chip
lpac profile download -s SMDP_SERVER_DOMAIN -m "YOUR_ACTIVATION_CODE"

# List installed profiles to capture the exact ICCID generated for Tello
lpac profile list

# Enable the downloaded Tello profile to connect the modem to the network
lpac profile enable [INSERT_TELLO_ICCID_HERE]

# Restart ModemManager now that lpac work is complete
sudo systemctl start ModemManager

# Verify the modem sees Tello
mmcli -m 0 
...
  3GPP     |                                imei: 1234567890
           |                       enabled locks: fixed-dialing
           |                         operator id: 310260
           |                       operator name: Tello
           |                        registration: home
           |                packet service state: attached
           |             network rejection error: implicitly-detached
           |       network rejection operator id: 310260
           | network rejection access technology: lte

```

Note I generalized the IMEI.
## Still No Voice
Apparently, I can have working SMS, but no voice. The dailer app just hangs on the calling screen when I try. I don't even hear a dial tone.

I see a lot of references to something called VoLTE being an issue. For example, [pmOS' Pixel 3a page](https://wiki.postmarketos.org/wiki/Google_Pixel_3a_(google-sargo#Calls) states "Support for VoLTE is currently experimental ... Calls may or may not work for you", so I'll save that for another post.